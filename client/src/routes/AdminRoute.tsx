// B-100 · Editorial Quiet Luxury: proteção operacional com estado de verificação visível.
import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getIsAdmin } from '../lib/adminAuth';

export default function AdminRoute({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'checking' | 'allowed' | 'denied'>('checking');

  useEffect(() => {
    let cancelled = false;
    getIsAdmin().then((isAdmin) => {
      if (!cancelled) setStatus(isAdmin ? 'allowed' : 'denied');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'checking') {
    return (
      <main className="min-h-screen grid place-items-center bg-[#f7f2ea] text-[#2b211d]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37]/30 border-t-[#d4af37]" />
          <p className="font-sans text-sm tracking-[0.14em] uppercase text-[#77675d]">A verificar acesso</p>
        </div>
      </main>
    );
  }

  return status === 'allowed' ? <>{children}</> : <Navigate to="/admin/login" replace />;
}
