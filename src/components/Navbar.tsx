import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { destinations, packages } from '@/data/mockData';

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  {
    label: 'DESTINATIONS',
    path: '/destinations',
    dropdown: destinations.map(d => ({ label: d.name, path: `/destinations/${d.id}` }))
  },
  {
    label: 'TOUR PACKAGES',
    path: '/packages',
    dropdown: packages.map(p => ({ label: p.title, path: `/packages/${p.id}` }))
  },
  { label: 'CAB SERVICES', path: '/#cab-booking' },
  { label: 'VEHICLES', path: '/vehicles' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'REVIEWS', path: '/reviews' },
  { label: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled && !mobileOpen;

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (route === '/' && isHome) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(route);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent
            ? 'bg-transparent py-4'
            : 'glass-light shadow-lg shadow-navy-900/5 py-2'
          }`}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="GARUDA TRAVELS home">
            <Logo light={transparent} size="md" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path.split('#')[0] && link.path !== '/#cab-booking' && link.path !== '/#faq';
              const content = (
                <span
                  className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-colors ${isActive
                      ? transparent
                        ? 'text-gold-300'
                        : 'text-gold-600'
                      : transparent
                        ? 'text-white/90 hover:text-gold-300'
                        : 'text-navy-700 hover:text-gold-600'
                    }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="h-3 w-3 opacity-70" />}
                </span>
              );
              return (
                <div key={link.label} className="group relative">
                  {link.path.includes('#') ? (
                    <button onClick={() => handleNavClick(link.path)}>
                      {content}
                    </button>
                  ) : (
                    <Link to={link.path}>
                      {content}
                    </Link>
                  )}
                  {link.dropdown && (
                    <div className="absolute left-0 top-full hidden w-56 pt-2 group-hover:block">
                      <div className="flex flex-col gap-1 rounded-xl border border-navy-100 bg-white p-2 shadow-xl">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="block rounded-lg px-4 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 hover:text-gold-600"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+918122552280"
              className="flex whitespace-nowrap items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-navy-900 shadow-md transition-all hover:bg-gold-600 hover:shadow-lg"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors lg:hidden ${transparent ? 'glass text-white' : 'bg-navy-50 text-navy-800'
              }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
      >
        <div
          className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
            <Logo size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-700"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-6">
            {navLinks.map((link) => (
              <div key={link.label} className="flex flex-col">
                {link.path.includes('#') ? (
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full text-left rounded-xl px-4 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 hover:text-gold-600 ${link.dropdown ? 'flex items-center justify-between' : 'block'}`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown className="h-4 w-4" />}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`w-full text-left rounded-xl px-4 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 hover:text-gold-600 ${link.dropdown ? 'flex items-center justify-between' : 'block'}`}
                    onClick={() => {
                      if (!link.dropdown) setMobileOpen(false);
                    }}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown className="h-4 w-4 opacity-50" />}
                  </Link>
                )}
                {link.dropdown && (
                  <div className="ml-4 flex flex-col gap-1 border-l-2 border-navy-100/50 py-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className="block w-full rounded-xl py-2.5 pl-5 pr-4 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 hover:text-gold-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="tel:+918122552280"
                className="flex items-center justify-center gap-2 rounded-xl bg-navy-50 px-4 py-3 text-sm font-bold text-navy-700"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
