// "use client";

// export default function AboutUs() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section
//         className="relative h-[40vh] min-h-[300px] bg-cover bg-center flex items-center justify-center"
//         style={{ backgroundImage: 'url("/about.jpg")' }}
//       >
//         <div className="absolute inset-0 bg-blue-900/50" />
//         <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
//             About <span className="text-yellow-400">Kalerwe Parent School</span>
//           </h1>
//           {/* ✅ ADDED: MOTTO - Prominently displayed under the main title */}
//           <div className="mb-4">
//             <p className="text-2xl sm:text-3xl font-light italic text-yellow-300">
//               "To invest in education"
//             </p>
//           </div>
//           <p className="text-lg sm:text-xl max-w-2xl mx-auto">
//             Continuing a legacy of excellence in education from Baby Class to Primary Seven
//           </p>
//         </div>
//       </section>

//       {/* Legacy & Leadership Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         {/* School Legacy */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Educational Legacy</h2>
//           <p className="text-gray-700 text-lg max-w-4xl mx-auto">
//             Founded by the visionary <strong>Late Diriisa</strong>, Kalerwe Parent School has been a cornerstone 
//             of quality education in our community for generations. From our humble beginnings, we have grown 
//             into a trusted institution that nurtures young minds from Baby Class through Primary Seven.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* Current Director */}
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="w-full h-96 overflow-hidden flex items-center justify-center bg-gray-100">
//               <img
//                 className="w-full h-full object-contain"
//                 src="/directorbibi.jpg"
//                 alt="Nakiyimba Sophia Bibi"
//                 style={{ maxHeight: '100%', maxWidth: '100%' }}
//               />
//             </div>
//             <div className="p-6 text-center md:text-left">
//               <h3 className="font-semibold text-2xl text-gray-900 mb-2">
//                 Nakiyimba Sophia Bibi
//               </h3>
//               <p className="text-gray-700 mb-4">Current Director</p>
//               <p className="text-gray-600 text-sm">
//                 Continuing the legacy of excellence established by our founder, Director Nakiyimba Sophia Bibi 
//                 ensures the smooth running and continuous improvement of Kalerwe Parent School. Her dedicated 
//                 leadership maintains our commitment to providing quality education while honoring our rich heritage.
//               </p>
//             </div>
//           </div>

//           {/* Educational Journey */}
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Educational Foundation</h2>
//             <p className="text-gray-700 mb-4">
//               At Kalerwe Parent School, we provide a <strong>complete educational journey</strong> from the 
//               earliest years in Baby Class through the crucial foundation years to Primary Seven. Our 
//               comprehensive curriculum ensures every child receives the solid foundation they need for 
//               future academic success.
//             </p>
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
//               <p className="text-gray-700">
//                 <strong>Programs Offered:</strong> Baby Class, Middle Class, Top Class, Primary One through Primary Seven
//               </p>
//             </div>
//             <p className="text-gray-700">
//               We believe in nurturing each child's unique potential while maintaining the high standards 
//               set by our founder, creating well-rounded individuals ready to excel in their next educational journey.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Vision, Mission & Motto Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Guiding Principles</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* ✅ ADDED: Motto as a separate prominent card */}
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Motto</h3>
//               <p className="text-gray-700 text-xl font-medium italic">
//                 "To invest in education"
//               </p>
//               <p className="text-gray-600 mt-3 text-sm">
//                 This simple yet powerful statement guides everything we do - from our teaching methods to our facility improvements.
//               </p>
//             </div>
            
//             <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
//               <p className="text-gray-600">
//                 To be the leading community school that transforms young lives through quality education, 
//                 building upon our founder's dream of accessible excellence for every child.
//               </p>
//             </div>
            
//             <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
//               <p className="text-gray-600">
//                 To provide a nurturing, comprehensive educational experience from early childhood through 
//                 primary completion, developing academically competent, morally grounded, and socially 
//                 responsible citizens.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Core Values */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-blue-900 mb-3">Legacy of Excellence</h3>
//               <p className="text-gray-600">
//                 Honoring our founder's vision while continuously improving to meet modern educational standards
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-blue-900 mb-3">Holistic Development</h3>
//               <p className="text-gray-600">
//                 Nurturing academic, social, and moral growth in every child from Baby Class to P7
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-blue-900 mb-3">Community Partnership</h3>
//               <p className="text-gray-600">
//                 Working closely with parents and guardians to ensure each child's success
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Join Our Community */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-700 text-white text-center">
//         <h2 className="text-3xl font-bold mb-6">Continue the Legacy With Us</h2>
//         <p className="mb-4 max-w-2xl mx-auto text-lg">
//           Join generations of families who have trusted Kalerwe Parent School with their children's education
//         </p>
        
//         {/* Professional Registration Notice */}
//         <div className="mb-8 max-w-3xl mx-auto">
//           <div className="bg-blue-800/50 border border-blue-400 rounded-lg p-6">
//             <h3 className="text-xl font-semibold mb-3 text-yellow-300">
//               📝 Enrollment Information
//             </h3>
//             <p className="text-blue-100">
//               <strong>We welcome students from Baby Class through Primary Seven</strong>. 
//               Visit our school for personalized admission guidance and to experience our nurturing learning environment.
//             </p>
//             <p className="text-blue-100 mt-2 text-sm">
//               Our team will provide complete information about our programs, requirements, and the educational 
//               journey we offer your child.
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <a
//             href="/schedule"
//             className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition text-lg"
//           >
//             Schedule a School Visit
//           </a>
//           <a
//             href="academics/programs"
//             className="border border-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-medium text-lg"
//           >
//             View Our Programs
//           </a>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-200 py-8 px-4 sm:px-6 lg:px-8 text-center">
//         <p className="text-lg">Kalerwe Parent School – Continuing a Legacy of Educational Excellence</p>
//         <p className="mt-2">
//           Kalerwe, Kampala – Uganda | Contact us for location details
//         </p>
//         <p className="mt-4 text-sm">
//           &copy; {new Date().getFullYear()} Kalerwe Parent School. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/about.jpg")' }}
      >
        <div className="absolute inset-0 bg-blue-900/50" />
        <motion.div 
          className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            variants={fadeInUp}
          >
            About <span className="text-yellow-400">Kalerwe Parent School</span>
          </motion.h1>
          
          {/* Motto - Prominently displayed under the main title */}
          <motion.div 
            className="mb-4"
            variants={fadeInUp}
          >
            <motion.p 
              className="text-2xl sm:text-3xl font-light italic text-yellow-300"
              animate={{ 
                scale: [1, 1.02, 1],
                textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "To invest in education"
            </motion.p>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Continuing a legacy of excellence in education from Baby Class to Primary Seven
          </motion.p>
        </motion.div>
      </section>

      {/* Legacy & Leadership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* School Legacy */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Educational Legacy</h2>
          <p className="text-gray-700 text-lg max-w-4xl mx-auto">
            Founded by the visionary <strong>Late Diriisa</strong>, Kalerwe Parent School has been a cornerstone 
            of quality education in our community for generations. From our humble beginnings, we have grown 
            into a trusted institution that nurtures young minds from Baby Class through Primary Seven.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Current Director */}
          <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-full h-96 overflow-hidden flex items-center justify-center bg-gray-100">
              <motion.img
                className="w-full h-full object-contain"
                src="/directorbibi.jpg"
                alt="Nakiyimba Sophia Bibi"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-6 text-center md:text-left">
              <motion.h3 
                className="font-semibold text-2xl text-gray-900 mb-2"
                whileHover={{ scale: 1.02 }}
              >
                Nakiyimba Sophia Bibi
              </motion.h3>
              <p className="text-gray-700 mb-4">Current Director</p>
              <p className="text-gray-600 text-sm">
                Continuing the legacy of excellence established by our founder, Director Nakiyimba Sophia Bibi 
                ensures the smooth running and continuous improvement of Kalerwe Parent School. Her dedicated 
                leadership maintains our commitment to providing quality education while honoring our rich heritage.
              </p>
            </div>
          </motion.div>

          {/* Educational Journey */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Educational Foundation</h2>
            <p className="text-gray-700 mb-4">
              At Kalerwe Parent School, we provide a <strong>complete educational journey</strong> from the 
              earliest years in Baby Class through the crucial foundation years to Primary Seven. Our 
              comprehensive curriculum ensures every child receives the solid foundation they need for 
              future academic success.
            </p>
            <motion.div 
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-gray-700">
                <strong>Programs Offered:</strong> Baby Class, Middle Class, Top Class, Primary One through Primary Seven
              </p>
            </motion.div>
            <p className="text-gray-700">
              We believe in nurturing each child's unique potential while maintaining the high standards 
              set by our founder, creating well-rounded individuals ready to excel in their next educational journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission & Motto Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Guiding Principles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Motto Card */}
            <motion.div 
              className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <motion.h3 
                className="text-2xl font-semibold text-gray-900 mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Our Motto
              </motion.h3>
              <motion.p 
                className="text-gray-700 text-xl font-medium italic"
                whileHover={{ scale: 1.05 }}
              >
                "To invest in education"
              </motion.p>
              <p className="text-gray-600 mt-3 text-sm">
                This simple yet powerful statement guides everything we do - from our teaching methods to our facility improvements.
              </p>
            </motion.div>
            
            {/* Vision Card */}
            <motion.div 
              className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading community school that transforms young lives through quality education, 
                building upon our founder's dream of accessible excellence for every child.
              </p>
            </motion.div>
            
            {/* Mission Card */}
            <motion.div 
              className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide a nurturing, comprehensive educational experience from early childhood through 
                primary completion, developing academically competent, morally grounded, and socially 
                responsible citizens.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Legacy of Excellence",
                description: "Honoring our founder's vision while continuously improving to meet modern educational standards"
              },
              {
                title: "Holistic Development", 
                description: "Nurturing academic, social, and moral growth in every child from Baby Class to P7"
              },
              {
                title: "Community Partnership",
                description: "Working closely with parents and guardians to ensure each child's success"
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <motion.h3 
                  className="text-xl font-semibold text-blue-900 mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  {value.title}
                </motion.h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Community */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-700 text-white text-center">
        <motion.h2 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Continue the Legacy With Us
        </motion.h2>
        
        <motion.p 
          className="mb-4 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join generations of families who have trusted Kalerwe Parent School with their children's education
        </motion.p>
        
        {/* Professional Registration Notice */}
        <motion.div 
          className="mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-blue-800/50 border border-blue-400 rounded-lg p-6">
            <motion.h3 
              className="text-xl font-semibold mb-3 text-yellow-300"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📝 Enrollment Information
            </motion.h3>
            <p className="text-blue-100">
              <strong>We welcome students from Baby Class through Primary Seven</strong>. 
              Visit our school for personalized admission guidance and to experience our nurturing learning environment.
            </p>
            <p className="text-blue-100 mt-2 text-sm">
              Our team will provide complete information about our programs, requirements, and the educational 
              journey we offer your child.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="/schedule"
            className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition text-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a School Visit
          </motion.a>
          <motion.a
            href="/academics/programs"
            className="border border-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-medium text-lg"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Our Programs
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-gray-200 py-8 px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg">Kalerwe Parent School – Continuing a Legacy of Educational Excellence</p>
        <p className="mt-2">
          Kalerwe, Kampala – Uganda | Contact us for location details
        </p>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} Kalerwe Parent School. All Rights Reserved.
        </p>
      </motion.footer>
    </div>
  );
}