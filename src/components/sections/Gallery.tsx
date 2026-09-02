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
    <section ref={ref} className="bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
