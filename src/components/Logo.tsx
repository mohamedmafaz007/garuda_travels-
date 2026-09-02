interface LogoProps {
  className?: string;
  light?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({
  className = '',
  light = false,
  size = 'md',
  showText = false,
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo.png"
        alt="Garuda Travels"
        className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.25)] hover:scale-105 hover:drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)]`}
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display text-lg sm:text-xl font-bold tracking-wider ${light ? 'text-white' : 'text-navy-900'}`}>
            GARUDA TRAVELS
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold-500 mt-0.5">
            Your Journey. Our Wings.
          </span>
        </div>
      )}
    </div>
  );
}

