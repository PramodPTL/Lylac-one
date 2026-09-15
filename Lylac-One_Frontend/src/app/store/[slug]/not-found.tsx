import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="text-6xl mb-4">🏥</div>
      <h1 className="text-2xl font-bold">Pharmacy not found</h1>
      <p className="text-muted-foreground mt-2 max-w-sm">The store you're looking for doesn't exist or has been removed.</p>
      <Link href="/"><Button size="lg" className="mt-6 rounded-full">Browse Nearby Pharmacies</Button></Link>
    </div>
  );
}
