"use client";

import Link from "next/link";
import { useState } from "react";

export default function StudentLife() {
  const [activeTab, setActiveTab] = useState('overview');

  const studentStats = [
    { number: "500+", label: "Active Students" },
    { number: "98%", label: "Pass Rate" },
    { number: "25+", label: "Clubs & Societies" },
    { number: "15", label: "Sports Teams" },
  ];

  const campusLife = [
    {
      title: "Academic Excellence",
      description: "Rigorous curriculum with modern teaching methodologies",
      icon: "🎓",
      features: ["Smart Classrooms", "Science Labs", "Library Resources", "Computer Labs"]
    },
    {
      title: "Sports & Athletics",
      description: "Developing physical fitness and team spirit",
      icon: "⚽",
      features: ["Football", "Basketball", "Athletics", "Swimming", "Netball"]
    },
    {
      title: "Arts & Culture",
      description: "Nurturing creativity and cultural appreciation",
      icon: "🎭",
      features: ["Music Club", "Drama Society", "Art Studio", "Dance Troupe"]
    },
    {
      title: "Leadership Development",
      description: "Building future leaders through various programs",
      icon: "🌟",
      features: ["Student Council", "Prefect System", "Club Leadership", "Mentorship"]
    }
  ];

  const dailySchedule = [
    { time: "7:30 AM", activity: "Morning Assembly", description: "Prayers and announcements" },
    { time: "8:00 AM", activity: "First Period", description: "Academic lessons begin" },
    { time: "10:30 AM", activity: "Break Time", description: "Refreshments and social time" },
    { time: "1:00 PM", activity: "Lunch Break", description: "Meals and rest period" },
    { time: "2:00 PM", activity: "Clubs & Sports", description: "Extracurricular activities" },
    { time: "4:00 PM", activity: "Dismissal", description: "End of school day" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Student Life</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Where Learning Meets Adventure, Creativity, and Growth
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {studentStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'gallery', label: 'Photo Gallery' },
              { id: 'results', label: 'PLE Results' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Welcome to Our Student Community
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Kalerwe Parent School, we believe education extends far beyond the classroom. 
            Our student life program is designed to nurture well-rounded individuals who excel 
            academically while developing essential life skills, character, and lasting friendships.
          </p>
        </section>

        {/* Campus Life Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Campus Life</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campusLife.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Schedule */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">A Day in the Life</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailySchedule.map((schedule, index) => (
              <div key={index} className="text-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-2xl font-bold text-blue-600 mb-2">{schedule.time}</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{schedule.activity}</h4>
                <p className="text-gray-600 text-sm">{schedule.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Sections */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Link href="/students/achievements" className="group">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3">Student Achievements</h3>
              <p className="opacity-90">Celebrating excellence in academics, sports, and arts</p>
              <div className="mt-4 text-green-200 group-hover:text-white transition-colors">
                Explore Achievements →
              </div>
            </div>
          </Link>

          <Link href="/students/gallery" className="group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-2xl font-bold mb-3">Photo Gallery</h3>
              <p className="opacity-90">Moments that define our vibrant school community</p>
              <div className="mt-4 text-purple-200 group-hover:text-white transition-colors">
                View Gallery →
              </div>
            </div>
          </Link>

          <Link href="/students/ple-results" className="group">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3">PLE Results</h3>
              <p className="opacity-90">Outstanding academic performance year after year</p>
              <div className="mt-4 text-blue-200 group-hover:text-white transition-colors">
                See Results →
              </div>
            </div>
          </Link>
        </div>

        {/* Testimonial Section */}
        <section className="bg-gray-800 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-700 rounded-xl p-6">
              <div className="text-yellow-400 text-4xl mb-4">"</div>
              <p className="text-lg italic mb-4">
                The clubs and sports activities have helped me discover my passion for leadership 
                and made school feel like a second home.
              </p>
              <div className="font-semibold">— Sarah K., Student Council President</div>
            </div>
            <div className="bg-gray-700 rounded-xl p-6">
              <div className="text-yellow-400 text-4xl mb-4">"</div>
              <p className="text-lg italic mb-4">
                From science fairs to sports competitions, there's always something exciting 
                happening that makes learning fun and memorable.
              </p>
              <div className="font-semibold">— David M., Science Club Member</div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/academics/programs" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-semibold border border-blue-200"
            >
              Academic Programs
            </Link>
            <Link 
              href="/admissions" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-semibold hover:bg-blue-700"
            >
              Join Our Community
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-gray-700 px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-semibold border border-gray-300"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}