"use client";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[40vh] min-h-[300px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url("/about.jpg")' }}
      >
        <div className="absolute inset-0 bg-blue-900/50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            About <span className="text-yellow-400">Kalerwe Parent School</span>
          </h1>
          {/* ✅ ADDED: MOTTO - Prominently displayed under the main title */}
          <div className="mb-4">
            <p className="text-2xl sm:text-3xl font-light italic text-yellow-300">
              "To invest in education"
            </p>
          </div>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            Continuing a legacy of excellence in education from Baby Class to Primary Seven
          </p>
        </div>
      </section>

      {/* Legacy & Leadership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* School Legacy */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Educational Legacy</h2>
          <p className="text-gray-700 text-lg max-w-4xl mx-auto">
            Founded by the visionary <strong>Late Diriisa</strong>, Kalerwe Parent School has been a cornerstone 
            of quality education in our community for generations. From our humble beginnings, we have grown 
            into a trusted institution that nurtures young minds from Baby Class through Primary Seven.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Current Director */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-96 overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                className="w-full h-full object-contain"
                src="/directorbibi.jpg"
                alt="Nakiyimba Sophia Bibi"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </div>
            <div className="p-6 text-center md:text-left">
              <h3 className="font-semibold text-2xl text-gray-900 mb-2">
                Nakiyimba Sophia Bibi
              </h3>
              <p className="text-gray-700 mb-4">Current Director</p>
              <p className="text-gray-600 text-sm">
                Continuing the legacy of excellence established by our founder, Director Nakiyimba Sophia Bibi 
                ensures the smooth running and continuous improvement of Kalerwe Parent School. Her dedicated 
                leadership maintains our commitment to providing quality education while honoring our rich heritage.
              </p>
            </div>
          </div>

          {/* Educational Journey */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Educational Foundation</h2>
            <p className="text-gray-700 mb-4">
              At Kalerwe Parent School, we provide a <strong>complete educational journey</strong> from the 
              earliest years in Baby Class through the crucial foundation years to Primary Seven. Our 
              comprehensive curriculum ensures every child receives the solid foundation they need for 
              future academic success.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-gray-700">
                <strong>Programs Offered:</strong> Baby Class, Middle Class, Top Class, Primary One through Primary Seven
              </p>
            </div>
            <p className="text-gray-700">
              We believe in nurturing each child's unique potential while maintaining the high standards 
              set by our founder, creating well-rounded individuals ready to excel in their next educational journey.
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Motto Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ✅ ADDED: Motto as a separate prominent card */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Motto</h3>
              <p className="text-gray-700 text-xl font-medium italic">
                "To invest in education"
              </p>
              <p className="text-gray-600 mt-3 text-sm">
                This simple yet powerful statement guides everything we do - from our teaching methods to our facility improvements.
              </p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading community school that transforms young lives through quality education, 
                building upon our founder's dream of accessible excellence for every child.
              </p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide a nurturing, comprehensive educational experience from early childhood through 
                primary completion, developing academically competent, morally grounded, and socially 
                responsible citizens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Legacy of Excellence</h3>
              <p className="text-gray-600">
                Honoring our founder's vision while continuously improving to meet modern educational standards
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Holistic Development</h3>
              <p className="text-gray-600">
                Nurturing academic, social, and moral growth in every child from Baby Class to P7
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Community Partnership</h3>
              <p className="text-gray-600">
                Working closely with parents and guardians to ensure each child's success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Continue the Legacy With Us</h2>
        <p className="mb-4 max-w-2xl mx-auto text-lg">
          Join generations of families who have trusted Kalerwe Parent School with their children's education
        </p>
        
        {/* Professional Registration Notice */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="bg-blue-800/50 border border-blue-400 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-yellow-300">
              📝 Enrollment Information
            </h3>
            <p className="text-blue-100">
              <strong>We welcome students from Baby Class through Primary Seven</strong>. 
              Visit our school for personalized admission guidance and to experience our nurturing learning environment.
            </p>
            <p className="text-blue-100 mt-2 text-sm">
              Our team will provide complete information about our programs, requirements, and the educational 
              journey we offer your child.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/schedule"
            className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-yellow-300 transition text-lg"
          >
            Schedule a School Visit
          </a>
          <a
            href="academics/programs"
            className="border border-white px-8 py-3 rounded-lg hover:bg-blue-800 transition font-medium text-lg"
          >
            View Our Programs
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg">Kalerwe Parent School – Continuing a Legacy of Educational Excellence</p>
        <p className="mt-2">
          Kalerwe, Kampala – Uganda | Contact us for location details
        </p>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} Kalerwe Parent School. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}