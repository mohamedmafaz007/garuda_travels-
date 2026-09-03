import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <div className="mb-5">
              <Logo light size="lg" />
            </div>
            <p className="text-sm leading-relaxed text-navy-300 mb-5">
              Your premier luxury travel partner for South India. We create comfortable, safe, and memorable journeys designed around you.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
                { icon: MessageCircle, href: 'https://wa.me/918122552280?text=Hi%20GARUDA%20TRAVELS,%20I%20have%20an%20enquiry', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-navy-300 transition-all hover:bg-gold-500 hover:text-navy-900"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-display text-base font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Destinations', path: '/destinations' },
                { label: 'Packages', path: '/packages' },
                { label: 'Vehicles', path: '/vehicles' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-display text-base font-bold text-white mb-5">Travel Services</h3>
            <ul className="space-y-3">
              {['Tour Packages', 'Cab Booking', 'Airport Transfers', 'Temple Tours', 'Honeymoon Trips', 'Family Holidays'].map((service) => {
                const servicePaths: Record<string, string> = {
                  'Tour Packages': '/packages',
                  'Cab Booking': '/vehicles',
                  'Airport Transfers': '/vehicles',
                  'Temple Tours': '/packages',
                  'Honeymoon Trips': '/packages',
                  'Family Holidays': '/packages',
                };
                return (
                  <li key={service}>
                    <Link to={servicePaths[service] || '/packages'} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                      {service}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-display text-base font-bold text-white mb-5">Popular Destinations</h3>
            <ul className="space-y-3">
              {['Madurai', 'Rameshwaram', 'Kodaikanal', 'Ooty', 'Munnar', 'Kanyakumari'].map((dest) => (
                <li key={dest}>
                  <Link to={`/destinations/${dest.toLowerCase()}`} className="text-sm text-navy-300 hover:text-gold-400 transition-colors">
                    {dest}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-3">
              <a href="tel:+918122552280" className="flex items-start gap-3 text-sm text-navy-300 hover:text-gold-400 transition-colors">
                <Phone className="h-4 w-4 shrink-0 mt-0.5" />
                <span>+91 81225 52280</span>
              </a>
              <a href="mailto:garudatravels@gmail.com" className="flex items-start gap-3 text-sm text-navy-300 hover:text-gold-400 transition-colors">
                <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                <span>garudatravels@gmail.com</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=5%2F434-D%2C+Thiruvalluvar+Nagar%2C+Thirunagar%2C+Madurai+-+625006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-navy-300 hover:text-gold-400 transition-colors"
              >
                <MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <span>5/434-D, Thiruvalluvar Nagar, Thirunagar, Madurai - 625006</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 sm:flex-row">
          <p className="text-sm text-navy-400">&copy; 2026 GARUDA TRAVELS. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-sm text-navy-400 hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="text-sm text-navy-400 hover:text-gold-400 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
