"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

interface GalleryPhoto {
  id: number;
  image_url: string;
  description: string | null;
  created_at: string;
}

// Cache System (same as before)
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
    const cacheData: CacheData = { data, timestamp: Date.now(), version: this.CACHE_VERSION };
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  static get(key: string): any | null {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(`cache_${key}`);
      if (!cached) return null;
      const cacheData: CacheData = JSON.parse(cached);
      if (cacheData.version !== this.CACHE_VERSION || Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
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
}

// ✅ NEW: Advanced Lazy Image Component for Gallery
const LazyGalleryImage = ({ 
  src, 
  alt, 
  description,
  onClick 
}: { 
  src: string; 
  alt: string; 
  description: string | null;
  onClick: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' } // Start loading earlier for smoother experience
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className="overflow-hidden rounded-xl shadow cursor-pointer relative group bg-white"
      onClick={onClick}
    >
      <div className="w-full aspect-square relative">
        {inView ? (
          <>
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } group-hover:scale-110`}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <span className="text-gray-400 text-sm">Loading...</span>
              </div>
            )}
          </>
        ) : (
          // Loading placeholder
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading...</span>
          </div>
        )}
      </div>
      
      {/* Description overlay */}
      {description && (
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-all duration-300 flex items-end p-3 ${
          inView && isLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
        }`}>
          <p className="text-white text-sm truncate">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default function LightboxGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ NEW: Progressive loading for large galleries
  const [visibleCount, setVisibleCount] = useState(16); // Initial load

  const fetchGalleryPhotos = async (forceRefresh: boolean = false) => {
    // ✅ FIRST: Always try cache first (unless forced refresh)
    if (!forceRefresh) {
      const cachedGallery = AppCache.get('gallery');
      if (cachedGallery) {
        setPhotos(cachedGallery);
        setLoading(false);
        return;
      }
    }

    try {
      // ✅ SECOND: Only fetch from Supabase if no cache or forced
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw new Error(`Database error: ${error.message}`);
      } else {
        setPhotos(data || []);
        AppCache.set('gallery', data);
      }
    } catch (error: any) {
      console.error("Fetch gallery error:", error);
      
      // ✅ SILENT FALLBACK: Use cached data without showing errors
      const cachedGallery = AppCache.get('gallery');
      if (cachedGallery) {
        setPhotos(cachedGallery);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  // ✅ NEW: Auto-load more when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (visibleCount >= photos.length) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Load more when 70% scrolled
      if (scrollTop + windowHeight >= documentHeight * 0.7) {
        setVisibleCount(prev => Math.min(prev + 8, photos.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [photos.length, visibleCount]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // ✅ NEW: Preload next and previous images in lightbox
  useEffect(() => {
    if (!isOpen) return;

    // Preload next image
    if (currentIndex < photos.length - 1) {
      const nextImg = new Image();
      nextImg.src = photos[currentIndex + 1].image_url;
    }

    // Preload previous image
    if (currentIndex > 0) {
      const prevImg = new Image();
      prevImg.src = photos[currentIndex - 1].image_url;
    }
  }, [isOpen, currentIndex, photos]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* ✅ REMOVED: Refresh button from loading state */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Photo Gallery</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow bg-gray-200 animate-pulse h-48"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const visiblePhotos = photos.slice(0, visibleCount);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ✅ REMOVED: Refresh button completely - simple centered title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Photo Gallery</h1>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg mb-4">No photos in the gallery yet</div>
          <p className="text-gray-400">Check back later for updates!</p>
        </div>
      ) : (
        <>
          {/* ✅ UPDATED: Using LazyGalleryImage component */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {visiblePhotos.map((photo, index) => (
              <LazyGalleryImage
                key={photo.id}
                src={photo.image_url}
                alt={photo.description || `Gallery photo ${index + 1}`}
                description={photo.description}
                onClick={() => openModal(index)}
              />
            ))}
          </div>

          {/* ✅ NEW: Load More section */}
          {visibleCount < photos.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Load More Photos ({photos.length - visibleCount} remaining)
              </button>
              <p className="text-gray-500 text-sm mt-2">
                Showing {visibleCount} of {photos.length} photos
              </p>
            </div>
          )}

          {visibleCount >= photos.length && (
            <div className="text-center mt-6 text-gray-600">
              Showing all {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </div>
          )}
        </>
      )}

      {/* Lightbox Modal - Enhanced with preloading */}
      {isOpen && photos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            onClick={closeModal}
          >
            &times;
          </button>

          <button
            className={`absolute left-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
            }`}
            onClick={prevImage}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>

          <div className="relative max-w-full max-h-full w-auto h-auto flex flex-col items-center">
            <img
              src={photos[currentIndex].image_url}
              alt={photos[currentIndex].description || `Gallery photo ${currentIndex + 1}`}
              className="rounded-lg shadow-lg object-contain max-w-full max-h-[80vh] transition-opacity duration-300"
            />
            
            {photos[currentIndex].description && (
              <div className="mt-4 text-white text-center max-w-2xl">
                <p className="text-lg">{photos[currentIndex].description}</p>
              </div>
            )}
            
            <div className="mt-2 text-white text-sm opacity-75">
              {currentIndex + 1} of {photos.length}
            </div>
          </div>

          <button
            className={`absolute right-5 text-white text-3xl font-bold z-10 hover:bg-white hover:bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
              currentIndex === photos.length - 1
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
            onClick={nextImage}
            disabled={currentIndex === photos.length - 1}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}