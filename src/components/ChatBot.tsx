import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { packages, destinations, vehicles, faqs } from '@/data/mockData';

type Message = {
    id: string;
    sender: 'bot' | 'user';
    text: React.ReactNode;
    isTyping?: boolean;
};

export default function ChatBot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: 'Hi! I am the GARUDA TRAVELS AI Assistant. How can I help you plan your trip today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const generateResponse = (text: string): React.ReactNode => {
        const q = text.toLowerCase();

        if (q.match(/\b(hi|hello|hey|greetings)\b/)) {
            return <span>Hello there! Are you looking for our tour packages, cab services, or information about a specific destination?</span>;
        }

        if (q.includes('price') || q.includes('cost') || q.includes('how much')) {
            return (
                <div>
                    <p>Our tour packages range from ₹4,500 to ₹16,500 depending on the duration and destination. Our cab services start at ₹1,600/day.</p>
                    <div className="mt-3 flex gap-2">
                        <Link to="/packages" onClick={onClose} className="inline-block rounded-xl bg-gold-500 px-4 py-2 text-xs font-bold text-navy-900 shadow-md transition-transform hover:scale-105">View Packages</Link>
                        <Link to="/vehicles" onClick={onClose} className="inline-block rounded-xl bg-navy-100 px-4 py-2 text-xs font-bold text-navy-800 shadow-sm transition-transform hover:scale-105">View Cabs</Link>
                    </div>
                </div>
            );
        }

        const matchedPackages = packages.filter(p => q.includes(p.id) || p.title.toLowerCase().includes(q) || p.highlights.some(h => h.toLowerCase().includes(q)));
        if (matchedPackages.length > 0) {
            return (
                <div className="space-y-2">
                    <p>I found some packages you might like:</p>
                    <ul className="mt-2 space-y-1 ml-2">
                        {matchedPackages.map(p => (
                            <li key={p.id}>• <strong>{p.title}</strong> ({p.duration}) - ₹{p.price}</li>
                        ))}
                    </ul>
                    <Link to="/packages" onClick={onClose} className="mt-3 inline-block rounded-xl bg-gold-500 px-4 py-2 text-xs font-bold text-navy-900 shadow-md transition-transform hover:scale-105">
                        View All Packages
                    </Link>
                </div>
            );
        }

        const matchedDestinations = destinations.filter(d => q.includes(d.id) || d.name.toLowerCase().includes(q));
        if (matchedDestinations.length > 0) {
            return (
                <div className="space-y-2">
                    <p>Yes! We cover these amazing destinations:</p>
                    <ul className="mt-2 space-y-1 ml-2">
                        {matchedDestinations.map(d => (
                            <li key={d.id}>• <strong>{d.name}</strong>: {d.shortDescription}</li>
                        ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {matchedDestinations.map(d => (
                            <Link key={'link-' + d.id} to={`/destinations/${d.id}`} onClick={onClose} className="inline-block rounded-xl bg-gold-500 px-3 py-1.5 text-xs font-bold text-navy-900 shadow-sm transition-transform hover:scale-105">
                                View {d.name}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        if (q.match(/\b(cab|taxi|car|vehicle|innova|dzire|ertiga|force)\b/)) {
            return (
                <div className="space-y-2">
                    <p>We provide premium cab services with professional drivers:</p>
                    <ul className="mt-2 space-y-1 ml-2">
                        {vehicles.map(v => (
                            <li key={v.id}>• <strong>{v.name}</strong> ({v.capacity} Seats) - ₹{v.price}/day</li>
                        ))}
                    </ul>
                    <Link to="/vehicles" onClick={onClose} className="mt-3 inline-block rounded-xl bg-gold-500 px-4 py-2 text-xs font-bold text-navy-900 shadow-md transition-transform hover:scale-105">
                        Book a Cab
                    </Link>
                </div>
            );
        }

        const matchedFaq = faqs.find(f => q.includes(f.question.toLowerCase().split(' ')[0]) || f.answer.toLowerCase().includes(q.split(' ')[0]));
        if (matchedFaq && q.length > 3) {
            let redirectLinks = [];
            const ans = matchedFaq.answer.toLowerCase();

            if (ans.includes('contact') || ans.includes('book') || ans.includes('whatsapp')) {
                redirectLinks.push({ path: '/contact', text: 'Contact Us' });
            }
            if (ans.includes('package') || ans.includes('itinerary')) {
                redirectLinks.push({ path: '/packages', text: 'View Packages' });
            }
            if (ans.includes('vehicle') || ans.includes('cab') || ans.includes('fleet')) {
                redirectLinks.push({ path: '/vehicles', text: 'View Fleet' });
            }
            if (ans.includes('destination') || ans.includes('kerala') || ans.includes('madurai')) {
                if (!redirectLinks.find(l => l.path === '/destinations')) {
                    redirectLinks.push({ path: '/destinations', text: 'Explore Destinations' });
                }
            }

            // Default link if none specifically matched
            if (redirectLinks.length === 0) {
                redirectLinks.push({ path: '/about', text: 'Learn More' });
            }

            return (
                <div className="space-y-2">
                    <p>{matchedFaq.answer}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {redirectLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                to={link.path}
                                onClick={onClose}
                                className={`inline-block rounded-xl px-4 py-2 text-xs font-bold shadow-md transition-transform hover:scale-105 ${idx === 0 ? 'bg-gold-500 text-navy-900' : 'bg-navy-100 text-navy-800'}`}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                <p>I'm still learning! You can ask me about our specific packages (like Munnar or Kodaikanal), our cab rentals, or our top destinations.</p>
                <Link to="/contact" onClick={onClose} className="mt-3 inline-block rounded-xl bg-navy-100 px-4 py-2 text-xs font-bold text-navy-800 shadow-sm transition-transform hover:scale-105">
                    Contact Human Support
                </Link>
            </div>
        );
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input.trim();
        setInput('');

        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: userText }]);

        const typingId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: typingId, sender: 'bot', text: '...', isTyping: true }]);

        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== typingId));
            setMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                sender: 'bot',
                text: generateResponse(userText)
            }]);
        }, 1200);
    };

    const handleSuggestion = (text: string) => {
        setInput(text);
    };

    return (
        <div className={`fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col bg-white shadow-2xl transition-transform duration-300 sm:bottom-6 sm:right-6 sm:top-auto sm:h-[600px] sm:w-[400px] sm:rounded-3xl sm:border sm:border-navy-100 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'}`}>

            <div className="flex items-center justify-between rounded-t-3xl bg-navy-900 px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 backdrop-blur-md">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-gold-400">GARUDA AI</h3>
                        <p className="text-xs text-navy-200 flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Online & Ready
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="rounded-full p-2 text-navy-200 transition-colors hover:bg-white/10 hover:text-white">
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-navy-50/50">
                <div className="flex flex-col gap-4">
                    {messages.map((m) => (
                        <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[85%] items-end gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.sender === 'user' ? 'bg-gold-500 text-navy-900' : 'bg-navy-900 text-gold-400'}`}>
                                    {m.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <div className={`rounded-2xl px-4 py-2.5 text-sm ${m.sender === 'user' ? 'rounded-br-sm bg-navy-900 text-white' : 'rounded-bl-sm bg-white text-navy-800 shadow-sm border border-navy-100'}`}>
                                    {m.isTyping ? (
                                        <div className="flex space-x-1.5 h-4 items-center">
                                            <div className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce"></div>
                                        </div>
                                    ) : (
                                        <div className="leading-relaxed">{m.text}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {messages.length < 3 && (
                <div className="px-4 pb-2 pt-2 bg-navy-50/50 flex gap-2 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {["Show Madurai packages", "Cab prices", "Family trips"].map(s => (
                        <button
                            key={s}
                            onClick={() => handleSuggestion(s)}
                            className="shrink-0 rounded-full border border-gold-200 bg-gold-50 px-3 py-1.5 text-xs font-semibold text-gold-800 transition-colors hover:bg-gold-100 whitespace-nowrap"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <div className="border-t border-navy-100 bg-white p-4 sm:rounded-b-3xl">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask GARUDA AI..."
                        className="w-full rounded-full border border-navy-200 bg-navy-50 py-3 pl-5 pr-12 text-sm text-navy-900 outline-none transition-all focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-500/20"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-white transition-all hover:bg-navy-800 disabled:opacity-50 disabled:hover:bg-navy-900"
                    >
                        <Send className="h-4 w-4 ml-0.5" />
                    </button>
                </form>
                <div className="mt-2 text-center">
                    <span className="text-[10px] text-navy-400">GARUDA Travel Assistant</span>
                </div>
            </div>

        </div>
    );
}
