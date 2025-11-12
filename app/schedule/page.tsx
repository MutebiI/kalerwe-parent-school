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

import { useState } from "react";

export default function ScheduleTour() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentAge: '',
    preferredDate: '',
    preferredTime: '',
    programInterest: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sendEmail', {  // Your existing endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `School Tour Request - ${formData.name}`,
          message: `
TOUR REQUEST DETAILS:

Parent Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Student Age: ${formData.studentAge}
Preferred Date: ${formData.preferredDate}
Preferred Time: ${formData.preferredTime}
Program Interest: ${formData.programInterest}
Additional Information: ${formData.additionalInfo}

This is a school tour request from the website.
          `.trim()
        }),
      });

      const result = await response.json();
      
      if (result.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to submit. Please try again or call us directly.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Request Received!</h2>
          <p className="text-gray-600 mb-6">
            Thank you <strong>{formData.name}</strong>! We've received your tour request and will contact you within 24 hours to confirm your visit.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left rounded-lg mb-6">
            <p className="text-sm text-blue-700">
              <strong>Next Steps:</strong> We'll call you at <strong>{formData.phone}</strong> to discuss available times and answer any questions about our {formData.programInterest} program.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Schedule Another Tour
            </button>
            <a
              href="/"
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule Your School Tour
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the Starlight School difference firsthand. Visit our campus, meet our teachers, and see our facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Parent's Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+256 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="studentAge" className="block text-sm font-semibold text-gray-700 mb-2">
                      Student's Age *
                    </label>
                    <select
                      id="studentAge"
                      name="studentAge"
                      required
                      value={formData.studentAge}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select age group</option>
                      <option value="3-4 years">3-4 years (Baby Class)</option>
                      <option value="4-5 years">4-5 years (Middle Class)</option>
                      <option value="5-6 years">5-6 years (Top Class)</option>
                      <option value="6-7 years">6-7 years (Primary 1)</option>
                      <option value="7-8 years">7-8 years (Primary 2)</option>
                      <option value="8-9 years">8-9 years (Primary 3)</option>
                      <option value="9-10 years">9-10 years (Primary 4)</option>
                      <option value="10-11 years">10-11 years (Primary 5)</option>
                      <option value="11-12 years">11-12 years (Primary 6)</option>
                      <option value="12-13 years">12-13 years (Primary 7)</option>
                    </select>
                  </div>
                </div>

                {/* Tour Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select preferred time</option>
                      <option value="Morning (8:00 AM - 10:00 AM)">Morning (8:00 AM - 10:00 AM)</option>
                      <option value="Late Morning (10:00 AM - 12:00 PM)">Late Morning (10:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 4:00 PM)">Afternoon (2:00 PM - 4:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="programInterest" className="block text-sm font-semibold text-gray-700 mb-2">
                    Program of Interest *
                  </label>
                  <select
                    id="programInterest"
                    name="programInterest"
                    required
                    value={formData.programInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select program</option>
                    <option value="Early Years (Baby Class - Top Class)">Early Years (Baby Class - Top Class)</option>
                    <option value="Lower Primary (P1 - P3)">Lower Primary (P1 - P3)</option>
                    <option value="Upper Primary (P4 - P7)">Upper Primary (P4 - P7)</option>
                    <option value="Not Sure - Need Guidance">Not Sure - Need Guidance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific areas you'd like to focus on during the tour, questions you have, or special requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    '📅 Request School Tour'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">📞 Prefer to Call?</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-blue-600 font-semibold">Phone</div>
                  <div className="text-gray-700">+256 704 267 770</div>
                </div>
                <div>
                  <div className="text-blue-600 font-semibold">Email</div>
                  <div className="text-gray-700">kalerweparents@gmail.com</div>
                </div>
                <div>
                  <div className="text-blue-600 font-semibold">Office Hours</div>
                  <div className="text-gray-700">Mon - Fri: 8:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 text-lg mb-3">What to Expect</h3>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Campus tour with our staff
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Meet potential teachers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  See classrooms & facilities
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Q&A session
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Admission guidance
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 rounded-2xl p-6">
              <h3 className="font-bold text-green-900 text-lg mb-3">Tour Duration</h3>
              <p className="text-green-700 text-sm">
                Plan for approximately <strong>45-60 minutes</strong> for a complete tour and discussion about your child's educational needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}