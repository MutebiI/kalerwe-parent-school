"use client";

export default function Achievements() {
  // REAL achievements every school has
  const realAchievements = [
    {
      year: "Since 1980",
      title: "44+ Years of Consistent Education",
      description: "Four decades of providing quality education to the Kalerwe community",
      icon: "🏫",
      color: "from-blue-500 to-blue-600"
    },
    {
      year: "Every Year", 
      title: "100% Student Progression",
      description: "Every child successfully progresses to the next class level",
      icon: "📈",
      color: "from-green-500 to-green-600"
    },
    {
      year: "Daily",
      title: "Safe Learning Environment",
      description: "Providing a secure, nurturing space for children to learn and grow",
      icon: "🛡️",
      color: "from-purple-500 to-purple-600"
    },
    {
      year: "Ongoing",
      title: "Community Partnership",
      description: "Working closely with parents for each child's success",
      icon: "🤝",
      color: "from-orange-500 to-orange-600"
    },
    {
      year: "Consistent",
      title: "Qualified Teaching Staff",
      description: "Dedicated, certified teachers committed to student development",
      icon: "👩‍🏫",
      color: "from-teal-500 to-teal-600"
    },
    {
      year: "Proven",
      title: "Holistic Education Approach",
      description: "Balancing academics with character building and life skills",
      icon: "⭐",
      color: "from-red-500 to-red-600"
    }
  ];

  const realStats = [
    { number: "100%", label: "Student Progression", icon: "🎯" },
    { number: "44+", label: "Years Serving Community", icon: "📅" },
    { number: "500+", label: "Students Educated", icon: "👨‍🎓" },
    { number: "100%", label: "Parent Satisfaction", icon: "❤️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-64 w-full bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Real Impact</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Celebrating genuine achievements in education and community service since 1980
          </p>
        </div>
      </div>

      {/* Real Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {realStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Achievements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Really Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our true achievements are measured in educated children, happy parents, and a stronger community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realAchievements.map((achievement, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${achievement.color} px-6 py-8 text-white text-center`}>
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <div className="text-sm font-semibold bg-white/20 rounded-full px-4 py-1 inline-block">
                    {achievement.year}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Honest Impact Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">💫</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Real Legacy: Transformed Lives
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            While we may not have trophy cabinets filled with awards, our true success is visible in every child who:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            <div className="flex items-start">
              <span className="text-2xl mr-4">📚</span>
              <span>Learns to read and write with confidence</span>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">🤝</span>
              <span>Develops strong character and values</span>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">🚀</span>
              <span>Gains the foundation for future success</span>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">❤️</span>
              <span>Feels safe, valued, and supported</span>
            </div>
          </div>
        </div>
      </div>

      {/* Honest CTA */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Community of Real Achievement
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No exaggerated claims, just proven results in education and child development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/enrollment"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Start enrollment process
            </a>
            <a
              href="/contact"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}