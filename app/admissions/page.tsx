// "use client";

// import Image from "next/image";

// export default function PLEResultsDynamic() {
//   // Get current year and build an array of the last 8 years
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 8 }, (_, i) => currentYear - i);

//   // Fixed, generalised counts per your instruction
//   const divisionCounts = {
//     I: 10,
//     II: 1,
//     III: 0,
//     IV: 0,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative h-64 w-full">
//         <Image
//           src="/images/pleresults.jpg" // Hero image inside public/images/
//           alt="PLE Results Hero"
//           fill
//           className="object-cover brightness-75"
//           priority
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg">
//             PLE Results
//           </h1>
//         </div>
//       </div>

//       {/* Extra Decorative Image */}
//       <div className="max-w-5xl mx-auto mt-6 px-4">
//         <Image
//           src="/images/students-celebrating.jpg" // <-- add this file to /public/images/
//           alt="Students celebrating results"
//           width={1000}
//           height={400}
//           className="rounded-lg shadow-lg object-cover w-full"
//         />
//         <p className="text-center text-gray-600 text-sm mt-2">
//           Our students celebrating after receiving excellent PLE results.
//         </p>
//       </div>

//       {/* Results Table */}
//       <div className="max-w-5xl mx-auto p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Summary (last 8 years)
//         </h2>

//         <div className="overflow-x-auto shadow-md rounded-lg bg-white">
//           <table className="min-w-full text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 border-b text-gray-700">Year</th>
//                 <th className="px-6 py-3 border-b text-gray-700">Division I</th>
//                 <th className="px-6 py-3 border-b text-gray-700">
//                   Division II
//                 </th>
//                 <th className="px-6 py-3 border-b text-gray-700">
//                   Division III
//                 </th>
//                 <th className="px-6 py-3 border-b text-gray-700">
//                   Division IV
//                 </th>
//                 <th className="px-6 py-3 border-b text-gray-700">Total</th>
//               </tr>
//             </thead>

//             <tbody>
//               {years.map((y) => {
//                 const total =
//                   divisionCounts.I +
//                   divisionCounts.II +
//                   divisionCounts.III +
//                   divisionCounts.IV;
//                 return (
//                   <tr
//                     key={y}
//                     className="hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     <td className="px-6 py-3 border-b font-medium">{y}</td>
//                     <td className="px-6 py-3 border-b">{divisionCounts.I}</td>
//                     <td className="px-6 py-3 border-b">{divisionCounts.II}</td>
//                     <td className="px-6 py-3 border-b">{divisionCounts.III}</td>
//                     <td className="px-6 py-3 border-b">{divisionCounts.IV}</td>
//                     <td className="px-6 py-3 border-b font-semibold">
//                       {total}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         <p className="text-sm text-gray-600 mt-4">
//           Note: This table is deliberately general and uses placeholder counts.
//           The year column is dynamic — when the calendar year changes, the top
//           row will update automatically to the new year and the rows below will
//           shift accordingly.
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

export default function Admissions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Begin Your Child's Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our family of learners where every child's potential is nurtured with care, excellence, and dedication since 1980.
          </p>
        </div>

        {/* Three-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Download Forms</h3>
            <p className="text-gray-600">
              Get our enrollment package with all required forms and detailed fee structure for each class.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✏️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Prepare Documents</h3>
            <p className="text-gray-600">
              Fill out the forms and gather required documents as listed in the requirements PDF.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🏫</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">3. Visit School</h3>
            <p className="text-gray-600">
              Bring everything to school for personal processing and meet our team.
            </p>
          </div>
        </div>

        {/* Main Action Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 text-lg mb-6">
                Download our complete enrollment package containing all necessary forms and detailed information.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  <span>Complete fee structure per class</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  <span>Enrollment application form</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  <span>Required documents checklist</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  <span>School policies & procedures</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📥</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Enrollment Package</h3>
                <p className="text-gray-600 mb-6">
                  Everything you need to begin the admission process in one convenient download.
                </p>
                <a
                  href="/enrollment"
                  className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Download Enrollment Package
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* School Tour Section - No Photos */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Our School</h2>
            <p className="text-gray-600 text-lg">
              Come see what makes our learning environment special
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">🏫</span>
                Personal School Tour
              </h3>
              <p className="text-gray-600 mb-4">
                Schedule a personalized tour to see our classrooms, meet our teachers, and experience our nurturing environment firsthand.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• See our modern learning facilities</li>
                <li>• Meet with our academic team</li>
                <li>• Discuss your child's specific needs</li>
                <li>• Get all your questions answered</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
                Open Days
              </h3>
              <p className="text-gray-600 mb-4">
                Join our scheduled open days to experience the school atmosphere and see our students in action.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-yellow-800 font-semibold">
                  Next Open Day: To be announced
                </p>
                <p className="text-yellow-700 text-sm mt-1">
                  Check back soon for our next open day schedule
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Age Requirements */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Age Guidelines</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-700 font-semibold">Baby Class</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">4+</div>
              <div className="text-gray-700 font-semibold">Middle Class</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-yellow-600 mb-2">5+</div>
              <div className="text-gray-700 font-semibold">Top Class</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-purple-600 mb-2">6+</div>
              <div className="text-gray-700 font-semibold">Primary One</div>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            * Age requirements are guidelines. We consider each child's individual readiness.
          </p>
        </div>

      </div>
    </div>
  );
}