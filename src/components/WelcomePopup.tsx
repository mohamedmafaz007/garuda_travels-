import { useState, useEffect } from "react";
import { X, Phone, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0B0F17] shadow-2xl ring-1 ring-gold-500/30 animate-in fade-in zoom-in-95 duration-500">

                <div className="relative overflow-hidden bg-gradient-to-br from-gold-500 via-gold-400 to-yellow-500 px-6 pt-8 pb-10 text-center">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-4 rounded-full p-2 text-navy-900/70 transition-colors hover:bg-navy-900/10 hover:text-navy-900"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <h2 className="relative z-10 text-[20px] font-black uppercase tracking-widest text-navy-900 leading-tight">
                        Welcome to
                        <br />
                        <span className="text-3xl tracking-tight text-navy-950 font-display">GARUDA TRAVELS</span>
                    </h2>
                    <p className="relative z-10 mt-3 font-semibold text-navy-900/90 tracking-wide text-sm">
                        Experience South India Like Never Before
                    </p>
                </div>

                <div className="relative -mt-4 rounded-t-3xl bg-[#0B0F17] px-8 pb-8 pt-8 text-center ring-1 ring-navy-900">
                    <h3 className="font-display text-xl font-bold text-white mb-6">
                        Why Choose GARUDA TRAVELS?
                    </h3>

                    <div className="space-y-4 text-left">
                        {[
                            "Customized Temple & Holiday Packages",
                            "Premium Fleet with Professional Drivers",
                            "Transparent Pricing & No Hidden Costs"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 border border-white/5">
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-400" />
                                <span className="text-sm font-medium text-navy-100">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 space-y-3">
                        <a
                            href="tel:+918122552280"
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-500 px-6 py-4 text-sm font-bold text-navy-900 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(250,212,109,0.3)] active:scale-95"
                        >
                            <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
                            Call Now: +91 81225 52280
                        </a>

                        <a
                            href="https://wa.me/918122552280"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-green-500/20 bg-green-500/10 px-6 py-4 text-sm font-bold text-green-400 transition-all hover:border-green-500/40 hover:bg-green-500/20 hover:scale-[1.02] active:scale-95"
                        >
                            <WhatsAppIcon className="h-5 w-5" />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
