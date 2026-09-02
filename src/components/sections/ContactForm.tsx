import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { destinations } from '@/data/mockData';

export default function ContactForm() {
  const { showToast } = useToast();
  const { ref, revealed } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    date: '',
    travelers: '2',
    message: '',
  });

  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      showToast('Please fill in your name and phone number', 'info');
      return;
    }

    const lines = [
      `Hi GARUDA TRAVELS, I want to send an enquiry!`,
      ``,
      `👤 Name: ${form.name}`,
      `📞 Phone: ${form.phone}`,
      form.email ? `✉️ Email: ${form.email}` : '',
      form.destination ? `📍 Destination: ${form.destination}` : '',
      form.date ? `📅 Travel Date: ${form.date}` : '',
      form.travelers ? `👥 Travelers: ${form.travelers}` : '',
      form.message ? `💬 Message: ${form.message}` : '',
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/918122552280?text=${encodeURIComponent(lines.join('\n'))}`;
    setLastWhatsAppUrl(whatsappUrl);
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    showToast('Enquiry details forwarded to WhatsApp (+91 81225 52280)!');
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: '', phone: '', email: '', destination: '', date: '', travelers: '2', message: '' });
  };

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Info */}
          <div className={`reveal ${revealed ? 'revealed' : ''}`}>
            <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Contact Us</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
              GARUDA TRAVELS
            </h2>
            <p className="mt-3 text-lg italic text-navy-500">Your Journey. Our Responsibility.</p>
            <p className="mt-6 text-base leading-relaxed text-navy-600">
              Have questions about our packages, vehicles, or routes? Reach out to us anytime. Our travel experts are ready to help you plan the perfect South India journey.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Phone, label: 'Phone', value: '+91 81225 52280', href: 'tel:+918122552280' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+91 81225 52280', href: 'https://wa.me/918122552280?text=Hi%20GARUDA%20TRAVELS,%20I%20have%20an%20enquiry' },
                { icon: Mail, label: 'Email', value: 'garudatravels@gmail.com', href: 'mailto:garudatravels@gmail.com' },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: '5/434-D, Thiruvalluvar Nagar, Thirunagar, Madurai - 625006',
                  href: 'https://www.google.com/maps/search/?api=1&query=5%2F434-D%2C+Thiruvalluvar+Nagar%2C+Thirunagar%2C+Madurai+-+625006',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-400 uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-base font-bold text-navy-800 hover:text-gold-600 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-base font-bold text-navy-800">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className={`reveal ${revealed ? 'revealed' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="rounded-3xl bg-ivory p-6 shadow-lg sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-navy-800">Thank You!</h3>
                  <p className="mt-2 text-sm text-navy-600">Our travel expert will contact you shortly.</p>
                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                    {lastWhatsAppUrl && (
                      <a
                        href={lastWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-green-700 shadow-md"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Open WhatsApp Chat</span>
                      </a>
                    )}
                    <button
                      onClick={resetForm}
                      className="rounded-full bg-navy-800 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-navy-900"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-700">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-700">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-700">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@email.com"
                        className="rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-700">Destination</label>
                      <select
                        value={form.destination}
                        onChange={(e) => setForm({ ...form, destination: e.target.value })}
                        className="rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      >
                        <option value="">Select Destination</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-700">Travel Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-700">Travelers</label>
                      <select
                        value={form.travelers}
                        onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                        className="rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                      >
                        {[1,2,3,4,5,6,7,8,9].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                        ))}
                        <option value="10+">10+ People</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-navy-700">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder="Tell us about your travel plans..."
                      className="resize-none rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy-700 to-navy-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Send className="h-4 w-4" />
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
