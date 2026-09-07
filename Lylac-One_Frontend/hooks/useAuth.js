'use client';
import { useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/services';
import { tokenStore } from '@/lib/api';
import { toast } from 'sonner';

export function useAuth() {
  const qc = useQueryClient();
  const [token, setToken] = useState(() => tokenStore.get());

  useEffect(() => {
    const onUnauth = () => { setToken(null); toast.error('Session expired. Please sign in again.'); };
    if (typeof window !== 'undefined') window.addEventListener('lylac:unauthorized', onUnauth);
    return () => { if (typeof window !== 'undefined') window.removeEventListener('lylac:unauthorized', onUnauth); };
  }, []);

  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: !!token,
    retry: 0,
  });

  const loginMut = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => { setToken(tokenStore.get()); qc.invalidateQueries({ queryKey: ['profile'] }); toast.success('Welcome back!'); },
    onError: (e) => toast.error(e.message || 'Login failed'),
  });

  const registerMut = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => { setToken(tokenStore.get()); qc.invalidateQueries({ queryKey: ['profile'] }); toast.success('Welcome to Lylac One!'); },
    onError: (e) => toast.error(e.message || 'Registration failed'),
  });

  const logout = useCallback(() => {
    authApi.logout(); setToken(null); qc.clear();
    toast.success('Signed out');
  }, [qc]);

  return {
    token, isAuthed: !!token,
    profile: profile.data, profileLoading: profile.isLoading,
    login: loginMut.mutateAsync, loggingIn: loginMut.isPending,
    register: registerMut.mutateAsync, registering: registerMut.isPending,
    logout,
  };
}
