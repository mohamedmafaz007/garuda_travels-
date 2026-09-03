import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { galleryImages } from '@/data/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Gallery({ limit }: { limit?: number }) {
  const { ref, revealed } = useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = limit ? galleryImages.slice(0, limit) : galleryImages;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ivory py-20 lg:py-28">
      {/* Decorative Orbs and Patterns */}
      <div className="absolute left-0 top-10 -translate-x-1/2 w-[500px] h-[500px] bg-gold-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-10 translate-x-1/2 w-[500px] h-[500px] bg-navy-200/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Side vectors */}
      <svg className="absolute -left-32 top-10 w-96 h-96 opacity-[0.03] pointer-events-none text-navy-900" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L54 10 L64 6 L60 16 L70 18 L62 26 L74 34 L64 38 L72 48 L60 46 L62 58 L52 50 L48 60 L42 50 L38 58 L40 46 L28 48 L36 38 L26 34 L38 26 L30 18 L40 16 L36 6 L46 10 Z" />
      </svg>
      <svg className="absolute -right-32 bottom-20 w-96 h-96 opacity-[0.03] pointer-events-none text-navy-900" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 L54 10 L64 6 L60 16 L70 18 L62 26 L74 34 L64 38 L72 48 L60 46 L62 58 L52 50 L48 60 L42 50 L38 58 L40 46 L28 48 L36 38 L26 34 L38 26 L30 18 L40 16 L36 6 L46 10 Z" />
      </svg>
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${revealed ? 'revealed' : ''} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-bold tracking-[0.2em] text-gold-600 uppercase">Gallery</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl text-balance">
            Moments From Our Journeys
          </h2>
        </div>

        <div className="mt-14 relative w-full overflow-hidden flex">
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] py-4">
            {[...images, ...images].map((img, i) => (
              <div
                key={`${img.id}-${i}`}
                className="group relative mx-2 sm:mx-3 h-64 w-48 sm:h-80 sm:w-60 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                onClick={() => setLightboxIndex(i % images.length)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm font-bold text-white">{img.category}</p>
                    <p className="mt-1 text-[10px] sm:text-xs text-white/80 line-clamp-2">{img.alt}</p>
                  </div>
                </div>
                <div className="absolute right-3 top-3 flex h-8 w-8 sm:h-9 sm:w-9 translate-y-2 scale-75 items-center justify-center rounded-full glass opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-950/95 backdrop-blur-sm animate-fade-in" onClick={closeLightbox}>
          <button
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full glass text-white transition-all hover:bg-white/20"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass text-white transition-all hover:bg-white/20 sm:left-6"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass text-white transition-all hover:bg-white/20 sm:right-6"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="max-w-5xl px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-white/80">{images[lightboxIndex].alt}</p>
              <p className="text-sm font-medium text-white/60">{lightboxIndex + 1} / {images.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

