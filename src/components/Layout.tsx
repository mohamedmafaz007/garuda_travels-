import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import WelcomePopup from '@/components/WelcomePopup';
import Logo from '@/components/Logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white relative">
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-navy-950 flex flex-col items-center justify-center transition-opacity duration-300">
          <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40">
            <div className="absolute inset-0 rounded-full border-4 border-navy-800 border-t-gold-400 border-r-gold-400/50 animate-spin"></div>
            <div className="animate-pulse flex items-center justify-center">
              <Logo size="lg" light />
            </div>
          </div>
        </div>
      )}
      <Navbar />
      <main className="pt-0">{children}</main>
      <Footer />
      <FloatingActions />
      <WelcomePopup />
      {/* Spacer for mobile bottom bar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
