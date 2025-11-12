"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

interface NewsPost {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

// Cache System (KEEPING YOUR EXISTING CACHE)
interface CacheData {
  data: any;
  timestamp: number;
  version: string;
}

class AppCache {
  private static readonly CACHE_DURATION = 5 * 60 * 1000;
  private static readonly CACHE_VERSION = 'v1';

  static set(key: string, data: any): void {
    if (typeof window === 'undefined') return;
    
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
      version: this.CACHE_VERSION
    };
    
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed:', error);
      this.clearOldEntries();
    }
  }

  static get(key: string): any | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;

      const cacheData: CacheData = JSON.parse(cached);
      
      if (cacheData.version !== this.CACHE_VERSION) {
        this.remove(key);
        return null;
      }
      
      if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
        this.remove(key);
        return null;
      }
      
      return cacheData.data;
    } catch (error) {
      this.remove(key);
      return null;
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`cache_${key}`);
  }

  private static clearOldEntries(): void {
    if (typeof window === 'undefined') return;
    
    Object.keys(localStorage)
      .filter(key => key.startsWith('cache_'))
      .forEach(key => {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const cacheData: CacheData = JSON.parse(cached);
            if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
              localStorage.removeItem(key);
            }
          }
        } catch (error) {
          localStorage.removeItem(key);
        }
      });
  }
}

// ✅ NEW: Lazy Image Component
const LazyImage = ({ 
  src, 
  alt, 
  className, 
  onClick, 
  maxHeight 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  onClick?: () => void;
  maxHeight?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' } // Start loading 50px before image enters viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {inView ? (
        <img
          src={src}
          alt={alt}
          onClick={onClick}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{ 
            maxHeight: maxHeight || 'none',
            maxWidth: '100%'
          }}
          onLoad={() => setIsLoaded(true)}
          loading="lazy" // Native lazy loading as fallback
        />
      ) : (
        // Loading placeholder
        <div 
          className="bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
          style={{ 
            height: maxHeight || '300px',
            maxWidth: '100%'
          }}
        >
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default function News() {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState<{[key: number]: boolean}>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageTitle, setSelectedImageTitle] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);

  // ✅ NEW: Performance optimization - only load visible content
  const [visiblePosts, setVisiblePosts] = useState<number>(6); // Initial load count

  const fetchNews = async () => {
    // ✅ FIRST: Always try cache first (super fast)
    const cachedNews = AppCache.get('news');
    if (cachedNews) {
      setNewsPosts(cachedNews);
      setSelectedPost(cachedNews[0] || null);
      setLoading(false);
      return;
    }

    // ✅ SECOND: Only fetch from Supabase if no cache exists
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching news:", error);
      const cachedNews = AppCache.get('news');
      if (cachedNews) {
        setNewsPosts(cachedNews);
        setSelectedPost(cachedNews[0] || null);
      }
    } else {
      setNewsPosts(data || []);
      setSelectedPost(data?.[0] || null);
      AppCache.set('news', data);
    }
    setLoading(false);
  };

  useEffect(() => { 
    fetchNews(); 
  }, []);

  // ✅ NEW: Load more posts when scrolling (for mobile view)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) { // Only for mobile
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Load more when 80% scrolled
        if (scrollTop + windowHeight >= documentHeight * 0.8) {
          setVisiblePosts(prev => Math.min(prev + 3, newsPosts.length));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [newsPosts.length]);

  const toggleExpand = (id: number) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectPost = (post: NewsPost) => {
    setSelectedPost(post);
  };

  const openImageModal = (imageUrl: string, title: string) => {
    setSelectedImage(imageUrl);
    setSelectedImageTitle(title);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedImageTitle("");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImageModal();
    };
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const formatContent = (content: string, isExpanded: boolean, postId: number) => {
    if (!isExpanded && content.length > 150) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      if (textContent.length > 150) {
        return (
          <div 
            className="news-content"
            dangerouslySetInnerHTML={{ __html: content.slice(0, 150) + '...' }} 
          />
        );
      }
    }
     
    return (
      <div 
        className="news-content"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ✅ Get other posts (excluding the currently selected one)
  const otherPosts = newsPosts.filter(post => post.id !== selectedPost?.id);

  // ✅ NEW: Optimized mobile posts (only show visible ones)
  const mobilePosts = newsPosts.slice(0, visiblePosts);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-blue-800 mb-8 text-2xl font-bold">School News</h1>
          <p className="text-center text-blue-700">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-blue-800 text-2xl font-bold text-center mb-8">School News</h1>

        {newsPosts.length === 0 ? (
          <p className="text-center text-blue-700">No news posts yet. Check back later!</p>
        ) : (
          /* ✅ DESKTOP: Two-column layout */
          <div className="hidden lg:flex flex-col lg:flex-row gap-8">
            {/* ✅ MAIN COLUMN - Featured News */}
            <div className="lg:flex-1">
              {selectedPost && (
                <div className="w-full bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="relative mb-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-2"></div>
                    <h2 className="text-blue-800 text-xl md:text-2xl font-bold text-center px-4">
                      {selectedPost.title}
                    </h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mt-2"></div>
                  </div>
                  
                  <div className="relative mb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-2"></div>
                    <p className="text-sm text-blue-600 font-semibold text-center">
                      📅 {formatDate(selectedPost.created_at)}
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mt-2"></div>
                  </div>
                  
                  {selectedPost.image_url && (
                    <div className="flex justify-center mb-6">
                      <div 
                        className="cursor-pointer transition-transform hover:scale-105 duration-200 w-full max-w-full"
                        onClick={() => openImageModal(selectedPost.image_url!, selectedPost.title)}
                      >
                        {/* ✅ UPDATED: Using LazyImage for main featured image */}
                        <LazyImage
                          src={selectedPost.image_url}
                          alt={selectedPost.title}
                          className="w-full max-w-full rounded-lg object-contain mx-auto"
                          maxHeight="400px"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="text-gray-800 leading-relaxed">
                    {formatContent(selectedPost.content, expandedPosts[selectedPost.id], selectedPost.id)}
                    
                    {selectedPost.content.length > 150 && (
                      <div className="mt-6 flex flex-col items-center">
                        {expandedPosts[selectedPost.id] && (
                          <div className="mb-4 text-center">
                            <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-2"></div>
                            <p className="text-sm text-blue-600 font-medium">
                              📅 Published on: {formatDate(selectedPost.created_at)}
                            </p>
                            <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mt-2"></div>
                          </div>
                        )}
                        <button
                          onClick={() => toggleExpand(selectedPost.id)}
                          className="text-blue-700 font-bold px-6 py-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors focus:outline-none border border-blue-300"
                        >
                          {expandedPosts[selectedPost.id] ? "Show Less" : "Read More"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ✅ SIDEBAR COLUMN - Other News */}
            <div className="lg:w-80">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-200 p-6 sticky top-8">
                <h3 className="text-blue-800 text-lg font-bold text-center mb-4 pb-2 border-b border-blue-200">
                  Other News
                </h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {otherPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer"
                      onClick={() => selectPost(post)}
                    >
                      <h4 className="text-blue-800 font-semibold text-sm mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-blue-600 text-xs">
                        📅 {formatDate(post.created_at)}
                      </p>
                      {post.image_url && (
                        /* ✅ UPDATED: Using LazyImage for sidebar thumbnails */
                        <LazyImage
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-20 object-cover rounded mt-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ MOBILE VIEW - With lazy loading optimization */}
        <div className="lg:hidden space-y-6">
          {mobilePosts.map((post) => (
            <div
              key={post.id}
              className="w-full bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-200 p-4 md:p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-2"></div>
                <h2 className="text-blue-800 text-lg md:text-xl font-bold text-center px-4">
                  {post.title}
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mt-2"></div>
              </div>
              
              <div className="relative mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-2"></div>
                <p className="text-sm text-blue-600 font-semibold text-center">
                  📅 {formatDate(post.created_at)}
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mt-2"></div>
              </div>
              
              {post.image_url && (
                <div className="flex justify-center mb-6">
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105 duration-200 w-full max-w-full"
                    onClick={() => openImageModal(post.image_url!, post.title)}
                  >
                    {/* ✅ UPDATED: Using LazyImage for mobile images */}
                    <LazyImage
                      src={post.image_url}
                      alt={post.title}
                      className="w-full max-w-full rounded-lg object-contain mx-auto"
                      maxHeight="300px"
                    />
                  </div>
                </div>
              )}
              
              <div className="text-gray-800 leading-relaxed">
                {formatContent(post.content, expandedPosts[post.id], post.id)}
                
                {post.content.length > 150 && (
                  <div className="mt-4 flex flex-col items-center">
                    {expandedPosts[post.id] && (
                      <div className="mb-3 text-center">
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-2"></div>
                        <p className="text-sm text-blue-600 font-medium">
                          📅 Published on: {formatDate(post.created_at)}
                        </p>
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mt-2"></div>
                      </div>
                    )}
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="text-blue-700 font-bold px-4 py-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors focus:outline-none border border-blue-300"
                    >
                      {expandedPosts[post.id] ? "Show Less" : "Read More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* ✅ NEW: Load More Button for Mobile */}
          {visiblePosts < newsPosts.length && (
            <div className="text-center">
              <button
                onClick={() => setVisiblePosts(prev => prev + 3)}
                className="text-blue-700 font-bold px-6 py-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors border border-blue-300"
              >
                Load More News ({newsPosts.length - visiblePosts} remaining)
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Section - UNCHANGED */}
        <div className="mt-12 p-6 md:p-8 border-t-2 border-blue-300 text-center bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg">
          <h2 className="text-blue-800 mb-4 text-lg md:text-xl font-bold">Stay Updated</h2>
          <p className="text-blue-700 mb-6">
            Never miss important school announcements and events.
          </p>

          <div className="max-w-md mx-auto">
            <div id="success-message" className="hidden mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
              <div className="font-bold">✅ Successfully Subscribed!</div>
              <div className="text-sm mt-1">You'll receive our latest news updates.</div>
            </div>

            <div id="error-message" className="hidden mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              <div className="font-bold">❌ Invalid Email</div>
              <div className="text-sm mt-1">Please enter a valid email address.</div>
            </div>

            <form 
              action="https://gmail.us14.list-manage.com/subscribe/post?u=ba886cf9d760e7b8176daeab6&amp;id=f173b72ef4&amp;f_id=00d9b4e5f0" 
              method="post" 
              id="mc-embedded-subscribe-form" 
              name="mc-embedded-subscribe-form" 
              target="hidden-iframe"
              className="validate"
              onSubmit={(e) => {
                const emailInput = e.currentTarget.EMAIL as HTMLInputElement;
                const email = emailInput.value.trim();
                
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                
                if (!emailRegex.test(email)) {
                  e.preventDefault();
                  document.getElementById('success-message')?.classList.add('hidden');
                  document.getElementById('error-message')?.classList.remove('hidden');
                  emailInput.focus();
                } else {
                  document.getElementById('error-message')?.classList.add('hidden');
                }
              }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  name="EMAIL" 
                  className="required email w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  id="mce-EMAIL" 
                  required 
                  placeholder="Enter your email" 
                  onChange={() => {
                    document.getElementById('error-message')?.classList.add('hidden');
                  }}
                />
                <input 
                  type="submit" 
                  name="subscribe" 
                  id="mc-embedded-subscribe" 
                  className="button w-full sm:w-auto px-6 py-3 bg-blue-700 text-white border-none rounded-lg cursor-pointer hover:bg-blue-800 transition-colors font-semibold" 
                  value="Subscribe" 
                />
              </div>
              
              <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                <input type="text" name="b_ba886cf9d760e7b8176daeab6_f173b72ef4" tabIndex={-1} defaultValue="" />
              </div>
            </form>

            <iframe 
              name="hidden-iframe" 
              id="hidden-iframe" 
              style={{display: 'none'}}
              onLoad={() => {
                document.getElementById('success-message')?.classList.remove('hidden');
                document.getElementById('error-message')?.classList.add('hidden');
                const form = document.getElementById('mc-embedded-subscribe-form') as HTMLFormElement;
                if (form) form.reset();
              }}
            ></iframe>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-0"
          onClick={closeImageModal}
        >
          <button
            className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 text-2xl transition-colors z-50 rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg"
            onClick={closeImageModal}
          >
            ✕
          </button>
          
          <img
            src={selectedImage}
            alt={selectedImageTitle}
            className="max-w-full max-h-full w-auto h-auto object-scale-down cursor-zoom-in"
            style={{
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
          />
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg text-center max-w-90vw">
            <p className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
              {selectedImageTitle}
            </p>
          </div>
          
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm">
            <p>Click anywhere to close • Pinch to zoom</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        .news-content {
          width: 100% !important;
          max-width: 100% !important;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          word-break: break-word !important;
          line-height: 1.7;
        }
        .news-content * {
          max-width: 100% !important;
          overflow-wrap: break-word !important;
        }
        .news-content img,
        .news-content video,
        .news-content iframe {
          max-width: 100% !important;
          height: auto !important;
        }
        .news-content table {
          width: 100% !important;
          max-width: 100% !important;
          display: block;
          overflow-x: auto;
        }
        .news-content pre,
        .news-content code {
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
          max-width: 100% !important;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
    
  );


  
}