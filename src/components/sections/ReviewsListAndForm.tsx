import { useState, useRef, useEffect } from 'react';
import { Star, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { testimonials } from '@/data/mockData';

type ReviewItem = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  likes: number;
  isLiked: boolean;
  timeText: string;
};

export default function ReviewsListAndForm() {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    route: '',
    review: ''
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    return testimonials.map((t, idx) => ({
      ...t,
      likes: Math.floor(Math.random() * 20) + 5, // mock initial likes
      isLiked: false,
      timeText: `${Math.max(1, 6 - idx)} months ago`
    }));
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
        
        // Add a small threshold for scrolling to the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // +24 for gap-6
        }
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.route || !formData.review || rating === 0) {
      alert('Please fill all required fields and provide a rating.');
      return;
    }

    const newReview: ReviewItem = {
      id: Date.now().toString(),
      name: formData.name,
      location: formData.route,
      rating,
      text: formData.review,
      likes: 0,
      isLiked: false,
      timeText: 'Just now'
    };

    setReviews(prev => [newReview, ...prev]);
    setFormData({ name: '', email: '', phone: '', route: '', review: '' });
    setRating(0);
    
    // Optionally scroll the new review into view
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleLike = (id: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          isLiked: !r.isLiked,
          likes: r.isLiked ? r.likes - 1 : r.likes + 1
        };
      }
      return r;
    }));
  };

  const overallRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="bg-navy-50 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16">
          
          {/* Feedback Form (Top) */}
          <div className="mx-auto w-full max-w-3xl">
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-navy-900/5">
              <h3 className="font-display text-2xl font-bold text-navy-900">Feedback Form</h3>
              <p className="mt-2 text-sm text-navy-600">
                Help other travelers by sharing your experience with GARUDA TRAVELS. Your review will be reviewed before being published.
              </p>
              
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy-900">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-900">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy-900">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 8122552280"
                    className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="route" className="mb-1.5 block text-sm font-semibold text-navy-900">Travel Route *</label>
                  <input
                    type="text"
                    id="route"
                    value={formData.route}
                    onChange={(e) => setFormData({...formData, route: e.target.value})}
                    placeholder="e.g., Madurai to Kerala"
                    className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-navy-900">Rating *</label>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= rating
                                ? 'fill-gold-500 text-gold-500'
                                : 'fill-navy-100 text-navy-100'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <span className="ml-2 text-sm font-medium text-navy-600">{rating} out of 5</span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="review" className="mb-1.5 block text-sm font-semibold text-navy-900">Your Review *</label>
                  <textarea
                    id="review"
                    rows={4}
                    value={formData.review}
                    onChange={(e) => setFormData({...formData, review: e.target.value})}
                    placeholder="Share your experience with GARUDA TRAVELS. What did you like? How was the service? Any suggestions for improvement?"
                    className="w-full resize-none rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all placeholder:text-navy-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                    required
                  />
                  <p className="mt-1.5 text-xs text-navy-500">Minimum 10 characters.</p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-navy-900 transition-all hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List (Bottom) */}
          <div className="w-full">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">What Our Customers Say</h2>
              <p className="mt-4 text-navy-600">
                Real experiences from our valued customers across South India.
              </p>
            </div>

            <div className="mt-10 mx-auto max-w-5xl">
              <div className="mb-6 flex items-center justify-center sm:justify-start gap-3 border-b border-navy-200 pb-4">
                <h3 className="font-display text-xl font-bold text-navy-900">Customer reviews</h3>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-navy-900">{overallRating}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-navy-500">({reviews.length} reviews)</span>
                </div>
              </div>

              {/* Horizontal Scrollable Container */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-2 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="snap-start shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] rounded-2xl bg-white p-6 shadow-md shadow-navy-900/5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-navy-900">{review.name}</span>
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-navy-500">
                        <span>{review.location}</span>
                        <span>•</span>
                        <span>{review.timeText}</span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-navy-700">
                        {review.text}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-4 border-t border-navy-50 pt-4">
                      <button 
                        onClick={() => handleLike(review.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                          review.isLiked ? 'text-gold-600' : 'text-navy-600 hover:text-gold-600'
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${review.isLiked ? 'fill-gold-600' : ''}`} />
                        Helpful {review.likes > 0 && `(${review.likes})`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
