import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main className="pt-0">{children}</main>
      <Footer />
      <FloatingActions />
      {/* Spacer for mobile bottom bar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
