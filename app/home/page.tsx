// "use client";

// import { useEffect, useRef, useState } from "react";

// function useCountUp(target: number, duration = 1500) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     let start = 0;
//     const step = 16;
//     const increment = target / (duration / step);
//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setCount(target);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, step);
//     return () => clearInterval(timer);
//   }, [target, duration]);
//   return count;
// }

// export default function Home() {
//   const heroRef = useRef<HTMLElement | null>(null);
//   const bgRef = useRef<HTMLDivElement | null>(null);
//   const currentYear = new Date().getFullYear();

//   // ✅ ADDED: Dynamic years calculation
//   const calculateYearsOfService = () => {
//     const foundingYear = 1980; // Change this to your school's actual founding year
//     return currentYear - foundingYear;
//   };

//   const yearsOfService = calculateYearsOfService();

//   // --- Parallax Background ---
//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReduced) return;

//     let ticking = false;
//     const onScroll = () => {
//       if (!heroRef.current || !bgRef.current) return;
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           const rect = heroRef.current.getBoundingClientRect();
//           const offset = rect.top * 0.25;
//           bgRef.current!.style.transform = `translateY(${offset}px)`;
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, []);

//   // --- Count-up Logic ---
//   const statsRef = useRef<HTMLDivElement | null>(null);
//   const [startCount, setStartCount] = useState(false);
//   useEffect(() => {
//     if (!statsRef.current) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setStartCount(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );
//     observer.observe(statsRef.current);
//     return () => observer.disconnect();
//   }, []);

//   const students = useCountUp(startCount ? 500 : 0);
//   const teachers = useCountUp(startCount ? 25 : 0);
//   const passRate = useCountUp(startCount ? 95 : 0);
//   const years = useCountUp(startCount ? yearsOfService : 0); // ✅ CHANGED: Now dynamic

//   return (
//     <div className="min-h-screen">
//       {/* Enhanced Hero Section */}
//       <section ref={heroRef} className="relative h-screen overflow-hidden pt-2 ">
//         <div
//           ref={bgRef}
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: 'url("/kalerwe.jpg")',
//             willChange: "transform",
//           }}
//         />
        
//         <div className="absolute inset-0 bg-blue-900/60" />

//         {/* Animated floating elements-----1 */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
//           <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white rounded-full opacity-20 animate-bounce"></div>
//           <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-40 animate-ping"></div>
//         </div>

//         <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
//           <div className="mb-8">
//             <div className="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
//               🎓 Est. 1980 • Legacy of Excellence
//             </div>
//           </div>
          
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//             Welcome to <span className="text-yellow-400 block mt-2">Kalerwe Parent School</span>
//           </h1>
          
//           <p className="text-xl sm:text-2xl text-gray-100 mb-8 max-w-3xl leading-relaxed">
//             Nurturing Young Minds with <span className="text-yellow-300 font-semibold">Excellence Since 1980</span>. 
//             Where Every Child's Potential Shines Bright
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
//             <a
//               href="/academics/programs"
//               className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//             >
//               🚀 Explore Our Programs
//             </a>
//             <a
//               href="/schedule"
//               className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
//             >
//               📅 Schedule a Tour
//             </a>
//           </div>

//           {/* Quick Stats Preview */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
//             {[
//               { number: `${yearsOfService}+`, label: "Years Legacy" }, // ✅ CHANGED: Now dynamic
//               { number: "500+", label: "Students" },
//               { number: "95%", label: "Success Rate" },
//               { number: "100%", label: "Dedicated" }
//             ].map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-white text-2xl font-bold">{stat.number}</div>
//                 <div className="text-yellow-200 text-sm">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Legacy & Excellence Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               A Legacy of <span className="text-blue-600">Educational Excellence</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               {/* ✅ CHANGED: Now dynamic years */}
//               For over {yearsOfService} years, Kalerwe Parent School has been the cornerstone of quality education, 
//               transforming young lives through innovative learning and character development.
//             </p>
//           </div>
        
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div className="relative">
//               <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
//                 <h3 className="text-2xl font-bold mb-4">🎯 Our Educational Promise</h3>
//                 <ul className="space-y-3 text-blue-100">
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
//                     Complete educational journey from Baby Class to Primary Seven
//                   </li>
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
//                     Modern curriculum with traditional values
//                   </li>
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
//                     Individualized attention in nurturing environment
//                   </li>
//                   <li className="flex items-center">
//                     <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
//                     Preparation for lifelong success and learning
//                   </li>
//                 </ul>
//               </div>
              
//               {/* Accent element */}
//               <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
//             </div>
//             <div className="space-y-6">
//               <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-600">
//                 <h4 className="font-semibold text-gray-900 text-lg mb-2">🏆 Proven Track Record</h4>
//                 <p className="text-gray-600">
//                   {/* ✅ CHANGED: Now dynamic years */}
//                   With {yearsOfService} years of consistent excellence, we've shaped generations of successful 
//                   students who excel in secondary education and beyond.
//                 </p>
//               </div>
              
//               <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-600">
//                 <h4 className="font-semibold text-gray-900 text-lg mb-2">💫 Holistic Development</h4>
//                 <p className="text-gray-600">
//                   We focus on academic excellence while nurturing character, creativity, and 
//                   social responsibility in every child.
//                 </p>
//               </div>
              
//               <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-yellow-600">
//                 <h4 className="font-semibold text-gray-900 text-lg mb-2">👨‍👩‍👧‍👦 Community Partnership</h4>
//                 <p className="text-gray-600">
//                   Working hand-in-hand with parents to ensure each child reaches their full potential 
//                   in a supportive learning environment.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Academic Programs */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Comprehensive <span className="text-blue-600">Educational Pathways</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               From early childhood foundations to primary completion, we provide seamless 
//               educational journeys tailored to each developmental stage.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Early Years */}
//             <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="relative h-64 overflow-hidden">
//                 <div
//                   className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
//                   style={{
//                     backgroundImage:
//                       'url("/smallkids.jpg")',
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-blue-900/20"></div>
//                 <div className="absolute top-4 left-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold">
//                   Ages 3-6
//                 </div>
//               </div>
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">🌟 Early Years Foundation</h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">
//                   Nurturing environment where young learners develop essential skills through 
//                   play-based activities, creative exploration, and social interaction.
//                 </p>
//                 <div className="grid grid-cols-2 gap-2 mb-6">
//                   {["Baby Class", "Middle Class", "Top Class", "Play-Based Learning"].map((item, idx) => (
//                     <div key={idx} className="flex items-center text-sm text-gray-700">
//                       <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//                 <a
//                   href="/academics/programs#early-years"
//                   className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 group-hover:translate-x-2 transition-transform"
//                 >
//                   Explore Early Years Program →
//                 </a>
//               </div>
//             </div>

//             {/* Primary School */}
//             <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
//               <div className="relative h-64 overflow-hidden">
//                 <div
//                   className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
//                   style={{
//                     backgroundImage:
//                       'url("/kalerwe.jpg")',
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-green-900/20"></div>
//                 <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold">
//                   P1 - P7
//                 </div>
//               </div>
//               <div className="p-8">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">📚 Primary Education</h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">
//                   Comprehensive curriculum building strong academic foundations while fostering 
//                   critical thinking, creativity, and character development.
//                 </p>
//                 <div className="grid grid-cols-2 gap-2 mb-6">
//                   {["Enhanced Curriculum", "STEM Education", "Creative Arts", "Sports & PE"].map((item, idx) => (
//                     <div key={idx} className="flex items-center text-sm text-gray-700">
//                       <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//                 <a
//                   href="/academics/programs#primary"
//                   className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 group-hover:translate-x-2 transition-transform"
//                 >
//                   Discover Primary Curriculum →
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Student Life */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Vibrant <span className="text-blue-600">Student Experience</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Beyond academics, we offer diverse opportunities for growth, creativity, and 
//               character development through engaging extracurricular activities.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 title: "🏆 Sports & Athletics",
//                 description: "Team sports promoting fitness, discipline and teamwork",
//                 icon: "⚽"
//               },
//               {
//                 title: "🎵 Music & Performing Arts",
//                 description: "Creative expression through music, dance and drama",
//                 icon: "🎭"
//               },
//               {
//                 title: "🔬 STEM Club",
//                 description: "Hands-on science, technology and innovation projects",
//                 icon: "🧪"
//               },
//               {
//                 title: "🌍 Community Service",
//                 description: "Developing social responsibility and leadership",
//                 icon: "🤝"
//               }
//             ].map((activity, idx) => (
//               <div key={idx} className="group text-center p-8 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-2">
//                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
//                   {activity.icon}
//                 </div>
//                 <h3 className="font-bold text-gray-900 text-lg mb-3">{activity.title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Stats Section */}
//       <section
//         ref={statsRef}
//         className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
//       >
//         {/* Background pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full"></div>
//           <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-yellow-400 rounded-full"></div>
//         </div>
        
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <h2 className="text-3xl font-bold mb-16">Why Families Choose Our School</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { number: students, suffix: "+", label: "Happy Students" },
//               { number: teachers, suffix: "+", label: "Expert Educators" },
//               { number: passRate, suffix: "%", label: "Academic Excellence" },
//               { number: years, suffix: "+", label: "Years of Legacy" } // ✅ CHANGED: Now dynamic
//             ].map((stat, index) => (
//               <div key={index} className="group">
//                 <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
//                   {stat.number}{stat.suffix}
//                 </div>
//                 <div className="text-blue-100 font-medium text-lg">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-400 to-yellow-500">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold text-blue-900 mb-6">
//             Ready to Join Our Family?
//           </h2>
//           <p className="text-blue-800 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
//             {/* ✅ CHANGED: Now dynamic years */}
//             Experience the difference of {yearsOfService} years in educational excellence. 
//             Schedule a personalized tour and see how we can help your child shine.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <a
//               href="/enrollment"
//               className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
//             >
//               📝 Begin Enrollment Process
//             </a>
//             <a
//               href="/contact"
//               className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-lg border-2 border-blue-900 flex items-center"
//             >
//               📞 Contact Our Team
//             </a>
//           </div>
          
//           <p className="text-blue-700 mt-6 text-sm">
//             Limited spots available for  &copy; {currentYear} academic year • Early enrollment recommended
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const currentYear = new Date().getFullYear();

  // ✅ ADDED: Dynamic years calculation
  const calculateYearsOfService = () => {
    const foundingYear = 1980; // Change this to your school's actual founding year
    return currentYear - foundingYear;
  };

  const yearsOfService = calculateYearsOfService();

  // --- Parallax Background ---
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let ticking = false;
    const onScroll = () => {
      if (!heroRef.current || !bgRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = heroRef.current.getBoundingClientRect();
          const offset = rect.top * 0.25;
          bgRef.current!.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // --- Count-up Logic ---
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const students = useCountUp(startCount ? 500 : 0);
  const teachers = useCountUp(startCount ? 25 : 0);
  const passRate = useCountUp(startCount ? 95 : 0);
  const years = useCountUp(startCount ? yearsOfService : 0); // ✅ CHANGED: Now dynamic

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden pt-2 ">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/kalerwe.jpg")',
            willChange: "transform",
          }}
        />
        
        <div className="absolute inset-0 bg-blue-900/60" />

        {/* Animated floating elements-----1 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-40 animate-ping"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
              🎓 Est. 1980 • Legacy of Excellence
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to <span className="text-yellow-400 block mt-2">Kalerwe Parent School</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-100 mb-8 max-w-3xl leading-relaxed">
            Nurturing Young Minds with <span className="text-yellow-300 font-semibold">Excellence Since 1980</span>. 
            Where Every Child's Potential Shines Bright
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/academics/programs"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Explore Our Programs
            </a>
            <a
              href="/schedule"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
            >
              📅 Schedule a Tour
            </a>
          </div>

          {/* Quick Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
            {[
              { number: `${yearsOfService}+`, label: "Years Legacy" }, // ✅ CHANGED: Now dynamic
              { number: "500+", label: "Students" },
              { number: "95%", label: "Success Rate" },
              { number: "100%", label: "Dedicated" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-white text-2xl font-bold">{stat.number}</div>
                <div className="text-yellow-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* 🎨 ENHANCED Legacy & Excellence Section with Beautiful Animations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              A Legacy of <span className="text-blue-600">Educational Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              For over {yearsOfService} years, Kalerwe Parent School has been the cornerstone of quality education, 
              transforming young lives through innovative learning and character development.
            </p>
          </div>
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-float">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold mb-4 animate-pulse">🎯 Our Educational Promise</h3>
                <ul className="space-y-3 text-blue-100">
                  {[
                    "Complete educational journey from Baby Class to Primary Seven",
                    "Modern curriculum with traditional values",
                    "Individualized attention in nurturing environment",
                    "Preparation for lifelong success and learning"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center animate-slide-in-left" style={{ animationDelay: `${index * 100}ms` }}>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-ping"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Animated accent elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  title: "🏆 Proven Track Record",
                  description: `With ${yearsOfService} years of consistent excellence, we've shaped generations of successful students who excel in secondary education and beyond.`,
                  color: "blue",
                  delay: "0ms"
                },
                {
                  title: "💫 Holistic Development",
                  description: "We focus on academic excellence while nurturing character, creativity, and social responsibility in every child.",
                  color: "green", 
                  delay: "200ms"
                },
                {
                  title: "👨‍👩‍👧‍👦 Community Partnership",
                  description: "Working hand-in-hand with parents to ensure each child reaches their full potential in a supportive learning environment.",
                  color: "yellow",
                  delay: "400ms"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-gray-50 rounded-xl p-6 border-l-4 border-${item.color}-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-right`}
                  style={{ animationDelay: item.delay }}
                >
                  <h4 className="font-semibold text-gray-900 text-lg mb-2 animate-bounce-in">{item.title}</h4>
                  <p className="text-gray-600 animate-fade-in">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🎨 ENHANCED Academic Programs with Staggered Animations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Comprehensive <span className="text-blue-600">Educational Pathways</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              From early childhood foundations to primary completion, we provide seamless 
              educational journeys tailored to each developmental stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "🌟 Early Years Foundation",
                age: "Ages 3-6",
                image: 'url("/smallkids.jpg")',
                color: "blue",
                items: ["Baby Class", "Middle Class", "Top Class", "Play-Based Learning"],
                link: "/academics/programs#early-years",
                description: "Nurturing environment where young learners develop essential skills through play-based activities, creative exploration, and social interaction.",
                delay: "0ms"
              },
              {
                title: "📚 Primary Education", 
                age: "P1 - P7",
                image: 'url("/kalerwe.jpg")',
                color: "green",
                items: ["Enhanced Curriculum", "STEM Education", "Creative Arts", "Sports & PE"],
                link: "/academics/programs#primary",
                description: "Comprehensive curriculum building strong academic foundations while fostering critical thinking, creativity, and character development.",
                delay: "200ms"
              }
            ].map((program, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-zoom-in"
                style={{ animationDelay: program.delay }}
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: program.image }}
                  />
                  <div className={`absolute inset-0 bg-${program.color}-900/20`}></div>
                  <div className={`absolute top-4 left-4 bg-${program.color}-500 text-white px-4 py-2 rounded-full font-bold animate-pulse`}>
                    {program.age}
                  </div>
                  {/* Floating animation overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-yellow-300 rounded-full animate-float animation-delay-1000"></div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:scale-105 transition-transform duration-300">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed animate-fade-in">
                    {program.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {program.items.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700 animate-slide-in-left" style={{ animationDelay: `${idx * 100}ms` }}>
                        <span className={`w-2 h-2 bg-${program.color}-600 rounded-full mr-2 animate-ping`} style={{ animationDelay: `${idx * 200}ms` }}></span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <a
                    href={program.link}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 group-hover:translate-x-2 transition-transform duration-300 animate-pulse"
                  >
                    Explore Program →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎨 ENHANCED Student Life with Floating Animations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Vibrant <span className="text-blue-600">Student Experience</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Beyond academics, we offer diverse opportunities for growth, creativity, and 
              character development through engaging extracurricular activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "🏆 Sports & Athletics",
                description: "Team sports promoting fitness, discipline and teamwork",
                icon: "⚽",
                delay: "0ms"
              },
              {
                title: "🎵 Music & Performing Arts", 
                description: "Creative expression through music, dance and drama",
                icon: "🎭",
                delay: "100ms"
              },
              {
                title: "🔬 STEM Club",
                description: "Hands-on science, technology and innovation projects",
                icon: "🧪",
                delay: "200ms"
              },
              {
                title: "🌍 Community Service",
                description: "Developing social responsibility and leadership", 
                icon: "🤝",
                delay: "300ms"
              }
            ].map((activity, idx) => (
              <div 
                key={idx}
                className="group text-center p-8 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all duration-500 transform hover:-translate-y-2 animate-float"
                style={{ animationDelay: activity.delay }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-bounce">
                  {activity.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-700 transition-colors duration-300">{activity.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed animate-fade-in">{activity.description}</p>
                {/* Hover effect line */}
                <div className="w-0 group-hover:w-16 h-1 bg-blue-500 mx-auto mt-4 transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎨 ENHANCED Stats Section with Advanced Animations */}
      <section
        ref={statsRef}
        className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full animate-ping"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-green-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-16 animate-fade-in-down">Why Families Choose Our School</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: students, suffix: "+", label: "Happy Students", delay: "0ms" },
              { number: teachers, suffix: "+", label: "Expert Educators", delay: "200ms" },
              { number: passRate, suffix: "%", label: "Academic Excellence", delay: "400ms" },
              { number: years, suffix: "+", label: "Years of Legacy", delay: "600ms" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group animate-zoom-in"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400 group-hover:scale-110 transition-transform duration-300 animate-count-up">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-blue-100 font-medium text-lg group-hover:text-white transition-colors duration-300">{stat.label}</div>
                {/* Animated underline */}
                <div className="w-0 group-hover:w-12 h-1 bg-yellow-400 mx-auto mt-2 transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎨 ENHANCED CTA Section with Pulse Animation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-400 to-yellow-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-900 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white rounded-full opacity-25 animate-ping"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-blue-900 mb-6 animate-tada">
            Ready to Join Our Family?
          </h2>
          <p className="text-blue-800 text-xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Experience the difference of {yearsOfService} years in educational excellence. 
            Schedule a personalized tour and see how we can help your child shine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/enrollment"
              className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center animate-pulse hover:animate-none"
            >
              📝 Begin Enrollment Process
            </a>
            <a
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-lg border-2 border-blue-900 flex items-center transform hover:scale-105"
            >
              📞 Contact Our Team
            </a>
          </div>
          
          <p className="text-blue-700 mt-6 text-sm animate-fade-in animation-delay-1000">
            Limited spots available for  &copy; {currentYear} academic year • Early enrollment recommended
          </p>
        </div>
      </section>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes tada {
          0% {
            transform: scale(1);
          }
          10%, 20% {
            transform: scale(0.9) rotate(-3deg);
          }
          30%, 50%, 70%, 90% {
            transform: scale(1.1) rotate(3deg);
          }
          40%, 60%, 80% {
            transform: scale(1.1) rotate(-3deg);
          }
          100% {
            transform: scale(1) rotate(0);
          }
        }
        @keyframes count-up {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        .animate-zoom-in {
          animation: zoom-in 0.6s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        .animate-tada {
          animation: tada 1s ease-in-out;
        }
        .animate-count-up {
          animation: count-up 0.8s ease-out;
        }
        .animate-slide-in-left {
          animation: fade-in-left 0.6s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}