// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface Teacher {
//   id: number;
//   name: string;
//   class_name: string;
//   image_url: string | null;
// }

// // ✅ ADDED: Cache System (same as news page)
// interface CacheData {
//   data: any;
//   timestamp: number;
//   version: string;
// }

// class AppCache {
//   private static readonly CACHE_DURATION = 5 * 60 * 1000;
//   private static readonly CACHE_VERSION = 'v1';

//   static set(key: string, data: any): void {
//     if (typeof window === 'undefined') return;
    
//     const cacheData: CacheData = {
//       data,
//       timestamp: Date.now(),
//       version: this.CACHE_VERSION
//     };
    
//     try {
//       localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData));
//     } catch (error) {
//       console.warn('Cache storage failed:', error);
//       this.clearOldEntries();
//     }
//   }

//   static get(key: string): any | null {
//     if (typeof window === 'undefined') return null;
    
//     try {
//       const cached = localStorage.getItem(`cache_${key}`);
//       if (!cached) return null;

//       const cacheData: CacheData = JSON.parse(cached);
      
//       if (cacheData.version !== this.CACHE_VERSION) {
//         this.remove(key);
//         return null;
//       }
      
//       if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
//         this.remove(key);
//         return null;
//       }
      
//       return cacheData.data;
//     } catch (error) {
//       this.remove(key);
//       return null;
//     }
//   }

//   static remove(key: string): void {
//     if (typeof window === 'undefined') return;
//     localStorage.removeItem(`cache_${key}`);
//   }

//   private static clearOldEntries(): void {
//     if (typeof window === 'undefined') return;
    
//     Object.keys(localStorage)
//       .filter(key => key.startsWith('cache_'))
//       .forEach(key => {
//         try {
//           const cached = localStorage.getItem(key);
//           if (cached) {
//             const cacheData: CacheData = JSON.parse(cached);
//             if (Date.now() - cacheData.timestamp > this.CACHE_DURATION) {
//               localStorage.removeItem(key);
//             }
//           }
//         } catch (error) {
//           localStorage.removeItem(key);
//         }
//       });
//   }
// }

// // ✅ NEW: Lazy Image Component for Staff Photos
// const LazyStaffImage = ({ 
//   src, 
//   alt, 
//   className, 
//   onClick,
//   hasImage 
// }: { 
//   src: string | null; 
//   alt: string; 
//   className?: string;
//   onClick?: () => void;
//   hasImage: boolean;
// }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [inView, setInView] = useState(false);
//   const imgRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: '100px' } // Start loading 100px before image enters viewport
//     );

//     if (imgRef.current) {
//       observer.observe(imgRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   if (!hasImage) {
//     return (
//       <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//         <span className="text-gray-500">No Image</span>
//       </div>
//     );
//   }

//   return (
//     <div ref={imgRef} className={className}>
//       {inView ? (
//         <img
//           src={src!}
//           alt={alt}
//           onClick={onClick}
//           className={`w-full h-full object-contain transition-opacity duration-300 ${
//             isLoaded ? 'opacity-100' : 'opacity-0'
//           }`}
//           style={{ 
//             padding: '8px', // Keep your existing padding
//           }}
//           onLoad={() => setIsLoaded(true)}
//           loading="lazy"
//         />
//       ) : (
//         // Loading placeholder that matches your design
//         <div 
//           className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center animate-pulse"
//           style={{ padding: '8px' }}
//         >
//           <span className="text-gray-400 text-sm">Loading...</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default function StaffPage() {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [selectedName, setSelectedName] = useState<string>("");
//   const [selectedRole, setSelectedRole] = useState<string>("");

//   // ✅ OPTIMIZED: Fetch with cache-first approach
//   const fetchTeachers = async () => {
//     // ✅ FIRST: Always try cache first (super fast)
//     const cachedTeachers = AppCache.get('teachers');
//     if (cachedTeachers) {
//       setTeachers(cachedTeachers);
//       setLoading(false);
//       return; // ← STOPS here, no API call needed!
//     }

//     // ✅ SECOND: Only fetch from Supabase if no cache exists
//     const { data, error } = await supabase
//       .from("teachers")
//       .select("*")
//       .order("name", { ascending: true });
    
//     if (error) {
//       console.error("Error fetching staff:", error);
//       // If API fails, try to use cached data as fallback (even if expired)
//       const cachedTeachers = AppCache.get('teachers');
//       if (cachedTeachers) {
//         setTeachers(cachedTeachers);
//       }
//     } else {
//       setTeachers(data || []);
//       AppCache.set('teachers', data); // ✅ Update cache with fresh data
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   // ✅ FIXED: Open image modal with name AND role
//   const openImageModal = (imageUrl: string, name: string, role: string) => {
//     setSelectedImage(imageUrl);
//     setSelectedName(name);
//     setSelectedRole(role);
//   };

//   // ✅ FIXED: Close image modal
//   const closeImageModal = () => {
//     setSelectedImage(null);
//     setSelectedName("");
//     setSelectedRole("");
//   };

//   // ✅ FIXED: Handle escape key to close modal
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') closeImageModal();
//     };
    
//     if (selectedImage) {
//       document.addEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'hidden'; // Prevent background scrolling
//     }
    
//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset';
//     };
//   }, [selectedImage]);

//   const administrativeStaff = teachers.filter(teacher => 
//     teacher.class_name.toLowerCase().includes('head') || 
//     teacher.class_name.toLowerCase().includes('bursar') ||
//     teacher.class_name.toLowerCase().includes('administrative') ||
//     teacher.class_name.toLowerCase().includes('director') ||
//     teacher.class_name.toLowerCase().includes('principal') ||
//     teacher.class_name.toLowerCase().includes('ceo') ||
//     teacher.class_name.toLowerCase().includes('executive') ||
//     teacher.class_name.toLowerCase().includes('coordinator') ||
//     teacher.class_name.toLowerCase().includes('proprietor') ||
//     teacher.class_name.toLowerCase().includes('owner') ||
//     teacher.class_name.toLowerCase().includes('founder')
//   );

//   const supportStaff = teachers.filter(teacher => 
//     !administrativeStaff.includes(teacher)
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600">Loading staff information...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative h-64 w-full">
//         <Image
//           src="/images/staff-hero.jpg"
//           alt="Staff Hero"
//           fill
//           className="object-cover brightness-75"
//           priority
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
//             School Staff
//           </h1>
//         </div>
//       </div>

//       {/* Introduction */}
//       <div className="max-w-5xl mx-auto py-8 px-4 text-center">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//           The Team Behind Our Success
//         </h2>
//         <p className="text-gray-600">
//           Our non-teaching staff play a vital role in ensuring that the school
//           runs smoothly. From administration to maintenance, each member of our
//           team contributes to the comfort, safety, and success of our students.
//         </p>
//       </div>

//       {/* Administrative Staff */}
//       <div className="max-w-6xl mx-auto px-4 pb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//           Administrative Team
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {administrativeStaff.map((staff) => (
//             <div
//               key={staff.id}
//               className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 border border-blue-100"
//             >
//               {/* ✅ UPDATED: Using LazyStaffImage component */}
//               <div 
//                 className="cursor-pointer relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
//                 onClick={() => staff.image_url && openImageModal(staff.image_url, staff.name, staff.class_name)}
//               >
//                 <LazyStaffImage
//                   src={staff.image_url}
//                   alt={staff.name}
//                   hasImage={!!staff.image_url}
//                 />
//               </div>
//               <div className="p-4 text-center bg-white">
//                 <h3 className="font-semibold text-gray-800 text-lg">
//                   {staff.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{staff.class_name}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Support Staff */}
//       <div className="max-w-6xl mx-auto px-4 pb-10">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
//           Support Staff
//         </h3>
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//           {supportStaff.map((staff) => (
//             <div
//               key={staff.id}
//               className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 border border-green-100"
//             >
//               {/* ✅ UPDATED: Using LazyStaffImage component */}
//               <div 
//                 className="cursor-pointer relative h-56 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50"
//                 onClick={() => staff.image_url && openImageModal(staff.image_url, staff.name, staff.class_name)}
//               >
//                 <LazyStaffImage
//                   src={staff.image_url}
//                   alt={staff.name}
//                   hasImage={!!staff.image_url}
//                 />
//               </div>
//               <div className="p-4 text-center bg-white">
//                 <h3 className="font-semibold text-gray-800 text-lg">
//                   {staff.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{staff.class_name}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ✅ IMPROVED: Image Modal with better background */}
//       {selectedImage && (
//         <div 
//           className="fixed inset-0 z-50 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4"
//           onClick={closeImageModal}
//         >
//           <div 
//             className="relative max-w-4xl max-h-full w-full"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
//           >
//             {/* ✅ FIXED: Red Close Button */}
//             <button
//               className="absolute -top-12 right-0 text-white bg-red-600 hover:bg-red-700 text-2xl transition-colors z-10 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg"
//               onClick={closeImageModal}
//             >
//               ✕
//             </button>
            
//             {/* Image */}
//             <img
//               src={selectedImage}
//               alt={selectedName}
//               className="w-full h-auto max-h-[80vh] object-contain rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50" // ✅ CHANGED: Better gradient background
//             />
            
//             {/* ✅ IMPROVED: Name AND Role Label */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 text-white px-6 py-3 rounded-lg text-center min-w-[200px] border border-gray-600">
//               <p className="text-lg font-bold">{selectedName}</p>
//               <p className="text-sm text-gray-300 mt-1">{selectedRole}</p>
//             </div>
            
//             {/* Instructions */}
//             <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm border border-gray-600">
//               <p>Click anywhere to close</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Teacher {
  id: number;
  name: string;
  class_name: string;
  image_url: string | null;
}

// ✅ ADDED: Cache System (same as news page)
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

// ✅ FIXED: Lazy Image Component for Staff Photos - Better image handling
const LazyStaffImage = ({ 
  src, 
  alt, 
  className, 
  onClick,
  hasImage 
}: { 
  src: string | null; 
  alt: string; 
  className?: string;
  onClick?: () => void;
  hasImage: boolean;
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
      { rootMargin: '100px' } // Start loading 100px before image enters viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!hasImage) {
    return (
      <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-xl">
        <span className="text-gray-500">No Image</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`${className} w-full`}>
      {inView ? (
        <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-t-xl p-4">
          <img
            src={src!}
            alt={alt}
            onClick={onClick}
            className="max-w-full max-h-full w-auto h-auto transition-opacity duration-300 rounded-lg"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              objectFit: 'contain' // ✅ FIXED: Changed to contain to show full image
            }}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        </div>
      ) : (
        // Loading placeholder that matches your design
        <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-xl animate-pulse">
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default function StaffPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  // ✅ OPTIMIZED: Fetch with cache-first approach
  const fetchTeachers = async () => {
    // ✅ FIRST: Always try cache first (super fast)
    const cachedTeachers = AppCache.get('teachers');
    if (cachedTeachers) {
      setTeachers(cachedTeachers);
      setLoading(false);
      return; // ← STOPS here, no API call needed!
    }

    // ✅ SECOND: Only fetch from Supabase if no cache exists
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("name", { ascending: true });
    
    if (error) {
      console.error("Error fetching staff:", error);
      // If API fails, try to use cached data as fallback (even if expired)
      const cachedTeachers = AppCache.get('teachers');
      if (cachedTeachers) {
        setTeachers(cachedTeachers);
      }
    } else {
      setTeachers(data || []);
      AppCache.set('teachers', data); // ✅ Update cache with fresh data
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ✅ FIXED: Open image modal with name AND role
  const openImageModal = (imageUrl: string, name: string, role: string) => {
    setSelectedImage(imageUrl);
    setSelectedName(name);
    setSelectedRole(role);
  };

  // ✅ FIXED: Close image modal
  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedName("");
    setSelectedRole("");
  };

  // ✅ FIXED: Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImageModal();
    };
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const administrativeStaff = teachers.filter(teacher => 
    teacher.class_name.toLowerCase().includes('head') || 
    teacher.class_name.toLowerCase().includes('bursar') ||
    teacher.class_name.toLowerCase().includes('administrative') ||
    teacher.class_name.toLowerCase().includes('director') ||
    teacher.class_name.toLowerCase().includes('principal') ||
    teacher.class_name.toLowerCase().includes('ceo') ||
    teacher.class_name.toLowerCase().includes('executive') ||
    teacher.class_name.toLowerCase().includes('coordinator') ||
    teacher.class_name.toLowerCase().includes('proprietor') ||
    teacher.class_name.toLowerCase().includes('owner') ||
    teacher.class_name.toLowerCase().includes('founder')
  );

  const supportStaff = teachers.filter(teacher => 
    !administrativeStaff.includes(teacher)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading staff information...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <Image
          src="/staff.jpg"
          alt="Staff Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
            School Staff
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-5xl mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          The Team Behind Our Success
        </h2>
        <p className="text-gray-600">
          Our non-teaching staff play a vital role in ensuring that the school
          runs smoothly. From administration to maintenance, each member of our
          team contributes to the comfort, safety, and success of our students.
        </p>
      </div>

      {/* Administrative Staff */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Administrative Team
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {administrativeStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 border border-blue-100"
            >
              {/* ✅ FIXED: Using improved LazyStaffImage component */}
              <div 
                className="cursor-pointer w-full"
                onClick={() => staff.image_url && openImageModal(staff.image_url, staff.name, staff.class_name)}
              >
                <LazyStaffImage
                  src={staff.image_url}
                  alt={staff.name}
                  hasImage={!!staff.image_url}
                />
              </div>
              <div className="p-4 text-center bg-white">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {staff.name}
                </h3>
                <p className="text-gray-600 text-sm">{staff.class_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Staff */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Support Staff
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {supportStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 border border-green-100"
            >
              {/* ✅ FIXED: Using improved LazyStaffImage component */}
              <div 
                className="cursor-pointer w-full"
                onClick={() => staff.image_url && openImageModal(staff.image_url, staff.name, staff.class_name)}
              >
                <LazyStaffImage
                  src={staff.image_url}
                  alt={staff.name}
                  hasImage={!!staff.image_url}
                />
              </div>
              <div className="p-4 text-center bg-white">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {staff.name}
                </h3>
                <p className="text-gray-600 text-sm">{staff.class_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ IMPROVED: Image Modal with better background */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl max-h-full w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
          >
            {/* ✅ FIXED: Red Close Button */}
            <button
              className="absolute -top-12 right-0 text-white bg-red-600 hover:bg-red-700 text-2xl transition-colors z-10 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg"
              onClick={closeImageModal}
            >
              ✕
            </button>
            
            {/* ✅ FIXED: Image container with proper sizing */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 max-w-full max-h-[80vh] flex items-center justify-center">
              <img
                src={selectedImage}
                alt={selectedName}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
              />
            </div>
            
            {/* ✅ IMPROVED: Name AND Role Label */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 text-white px-6 py-3 rounded-lg text-center min-w-[200px] border border-gray-600">
              <p className="text-lg font-bold">{selectedName}</p>
              <p className="text-sm text-gray-300 mt-1">{selectedRole}</p>
            </div>
            
            {/* Instructions */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm border border-gray-600">
              <p>Click anywhere to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}