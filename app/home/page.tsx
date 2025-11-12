"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Floating Particles Component - Fixed hydration issue
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const generatedParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
}

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
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  const calculateYearsOfService = () => {
    const foundingYear = 1980;
    return currentYear - foundingYear;
  };

  const yearsOfService = calculateYearsOfService();

  // --- Parallax Background ---
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;
    const onScroll = () => {
      if (!heroRef.current || !bgRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = heroRef.current!.getBoundingClientRect();
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
  const statsRef = useRef<HTMLDivElement>(null);
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
  const years = useCountUp(startCount ? yearsOfService : 0);

  // Color mapping for program items
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; border: string } } = {
      blue: { bg: "bg-blue-600", border: "border-blue-600" },
      green: { bg: "bg-green-600", border: "border-green-600" },
      yellow: { bg: "bg-yellow-600", border: "border-yellow-600" }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden pt-2">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/kalerwe.jpg")',
            willChange: "transform",
          }}
        />
        
        <div className="absolute inset-0 bg-blue-900/60" />

        {/* Animated floating elements - Fixed with Framer Motion */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-6 h-6 bg-white rounded-full opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-40"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        <motion.div 
          className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <motion.div 
              className="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-full text-sm font-semibold mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              🎓 Est. 1980 • Legacy of Excellence
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Welcome to <span className="text-yellow-400 block mt-2">Kalerwe Parent School</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-100 mb-8 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Nurturing Young Minds with <span className="text-yellow-300 font-semibold">Excellence Since 1980</span>. 
            Where Every Child's Potential Shines Bright
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a
              href="/academics/programs"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Explore Our Programs
            </motion.a>
            <motion.a
              href="/schedule"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
              whileHover={{ scale: 1.05, backgroundColor: "white", color: "#1e40af" }}
              whileTap={{ scale: 0.95 }}
            >
              📅 Schedule a Tour
            </motion.a>
          </motion.div>

          {/* Quick Stats Preview */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {[
              { number: `${yearsOfService}+`, label: "Years Legacy" },
              { number: "500+", label: "Students" },
              { number: "95%", label: "Success Rate" },
              { number: "100%", label: "Dedicated" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-white text-2xl font-bold">{stat.number}</div>
                <div className="text-yellow-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Legacy & Excellence Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              A Legacy of <span className="text-blue-600">Educational Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over {yearsOfService} years, Kalerwe Parent School has been the cornerstone of quality education, 
              transforming young lives through innovative learning and character development.
            </p>
          </motion.div>
        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
                <motion.h3 
                  className="text-2xl font-bold mb-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎯 Our Educational Promise
                </motion.h3>
                <ul className="space-y-3 text-blue-100">
                  {[
                    "Complete educational journey from Baby Class to Primary Seven",
                    "Modern curriculum with traditional values",
                    "Individualized attention in nurturing environment",
                    "Preparation for lifelong success and learning"
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.span 
                        className="w-2 h-2 bg-yellow-400 rounded-full mr-3"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Animated accent elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-2 -left-2 w-16 h-16 bg-blue-400 rounded-full opacity-30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            <div className="space-y-6">
              {[
                {
                  title: "🏆 Proven Track Record",
                  description: `With ${yearsOfService} years of consistent excellence, we've shaped generations of successful students who excel in secondary education and beyond.`,
                  color: "blue",
                },
                {
                  title: "💫 Holistic Development",
                  description: "We focus on academic excellence while nurturing character, creativity, and social responsibility in every child.",
                  color: "green", 
                },
                {
                  title: "👨‍👩‍👧‍👦 Community Partnership",
                  description: "Working hand-in-hand with parents to ensure each child reaches their full potential in a supportive learning environment.",
                  color: "yellow",
                }
              ].map((item, index) => {
                const colorClasses = getColorClasses(item.color);
                return (
                  <motion.div 
                    key={index}
                    className={`bg-gray-50 rounded-xl p-6 border-l-4 ${colorClasses.border} hover:shadow-lg transition-all duration-300`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.h4 
                      className="font-semibold text-gray-900 text-lg mb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      {item.title}
                    </motion.h4>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Academic Programs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive <span className="text-blue-600">Educational Pathways</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From early childhood foundations to primary completion, we provide seamless 
              educational journeys tailored to each developmental stage.
            </p>
          </motion.div>

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
              },
              {
                title: "📚 Primary Education", 
                age: "P1 - P7",
                image: 'url("/kalerwe.jpg")',
                color: "green",
                items: ["Enhanced Curriculum", "STEM Education", "Creative Arts", "Sports & PE"],
                link: "/academics/programs#primary",
                description: "Comprehensive curriculum building strong academic foundations while fostering critical thinking, creativity, and character development.",
              }
            ].map((program, index) => {
              const colorClasses = getColorClasses(program.color);
              return (
                <motion.div 
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: program.image }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className={`absolute inset-0 ${program.color === 'blue' ? 'bg-blue-900/20' : 'bg-green-900/20'}`}></div>
                    <motion.div 
                      className={`absolute top-4 left-4 ${program.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'} text-white px-4 py-2 rounded-full font-bold`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {program.age}
                    </motion.div>
                  </div>
                  <div className="p-8">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 mb-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      {program.title}
                    </motion.h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {program.items.map((item, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center text-sm text-gray-700"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <motion.span 
                            className={`w-2 h-2 ${colorClasses.bg} rounded-full mr-2`}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                          />
                          {item}
                        </motion.div>
                      ))}
                    </div>
                    <motion.a
                      href={program.link}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
                      whileHover={{ x: 5 }}
                    >
                      Explore Program →
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Student Life */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vibrant <span className="text-blue-600">Student Experience</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond academics, we offer diverse opportunities for growth, creativity, and 
              character development through engaging extracurricular activities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "🏆 Sports & Athletics",
                description: "Team sports promoting fitness, discipline and teamwork",
                icon: "⚽",
              },
              {
                title: "🎵 Music & Performing Arts", 
                description: "Creative expression through music, dance and drama",
                icon: "🎭",
              },
              {
                title: "🔬 STEM Club",
                description: "Hands-on science, technology and innovation projects",
                icon: "🧪",
              },
              {
                title: "🌍 Community Service",
                description: "Developing social responsibility and leadership", 
                icon: "🤝",
              }
            ].map((activity, idx) => (
              <motion.div 
                key={idx}
                className="group text-center p-8 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {activity.icon}
                </motion.div>
                <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                <motion.div 
                  className="w-0 group-hover:w-16 h-1 bg-blue-500 mx-auto mt-4 transition-all duration-500 rounded-full"
                  whileHover={{ width: 64 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section - FIXED: Using FloatingParticles component */}
      <section
        ref={statsRef}
        className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-48 h-48 border-2 border-yellow-400 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* FIXED: Using FloatingParticles component instead of inline random styles */}
        <div className="absolute inset-0">
          <FloatingParticles />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-3xl font-bold mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Families Choose Our School
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: students, suffix: "+", label: "Happy Students" },
              { number: teachers, suffix: "+", label: "Expert Educators" },
              { number: passRate, suffix: "%", label: "Academic Excellence" },
              { number: years, suffix: "+", label: "Years of Legacy" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="group"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.number}{stat.suffix}
                </motion.div>
                <div className="text-blue-100 font-medium text-lg group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
                <motion.div 
                  className="w-0 group-hover:w-12 h-1 bg-yellow-400 mx-auto mt-2 rounded-full"
                  whileHover={{ width: 48 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-400 to-yellow-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-20"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-16 h-16 bg-blue-900 rounded-full opacity-30"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-blue-900 mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Ready to Join Our Family?
          </motion.h2>
          <motion.p 
            className="text-blue-800 text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Experience the difference of {yearsOfService} years in educational excellence. 
            Schedule a personalized tour and see how we can help your child shine.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/enrollment"
              className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 20px 25px -5px rgba(30, 64, 175, 0.3)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📝 Begin Enrollment Process
            </motion.a>
            <motion.a
              href="/contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-lg border-2 border-blue-900 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 Contact Our Team
            </motion.a>
          </div>
          
          <motion.p 
            className="text-blue-700 mt-6 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Limited spots available for  &copy; {currentYear} academic year • Early enrollment recommended
          </motion.p>
        </div>
      </section>
    </div>
  );
}