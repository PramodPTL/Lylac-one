import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from './providers';

export const metadata = {
  title: 'Lylac One — Your Neighbourhood Pharmacy, Delivered',
  description: 'Order medicines from nearby pharmacies. Fast delivery, verified stores, and trusted healthcare — all in one app.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
