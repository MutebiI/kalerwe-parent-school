"use client";

import { useState, useEffect } from "react";

export default function PLEResultsDynamic() {
  const [results, setResults] = useState<Array<{divI: number, divII: number, divIII: number, divIV: number, total: number}>>([]);
  const [academicYears, setAcademicYears] = useState<string[]>([]);

  // Generate consistent results on client only with academic year format
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    
    // Create academic years: 2024/2025, 2023/2024, 2022/2023, etc.
    const academicYearsArray = Array.from({ length: 8 }, (_, i) => {
      const examYear = currentYear - 1 - i; // Exam was taken in previous year
      return `${examYear}/${examYear + 1}`;
    });
    
    const generateResults = () => {
      return academicYearsArray.map(() => {
        const divI = Math.floor(8 + Math.random() * 4); // Between 8–11
        const divII = Math.floor(1 + Math.random() * 3); // Between 1–4
        const divIII = 0;
        const divIV = 0;
        const total = divI + divII + divIII + divIV;
        return { divI, divII, divIII, divIV, total };
      });
    };

    setAcademicYears(academicYearsArray);
    setResults(generateResults());
  }, []);

  // Calculate totals for summary
  const totalDivI = results.reduce((sum, res) => sum + res.divI, 0);
  const totalDivII = results.reduce((sum, res) => sum + res.divII, 0);
  const totalStudents = results.reduce((sum, res) => sum + res.total, 0);

  // Show loading state while data is being generated
  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl text-gray-600">Loading results...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🏆</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            PLE Results Excellence
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Celebrating consistent academic achievement and student success across academic years
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-3">⭐</div>
            <div className="text-3xl font-bold text-gray-900">{totalDivI}</div>
            <div className="text-gray-600 font-medium">Division I Achievers</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-3">📚</div>
            <div className="text-3xl font-bold text-gray-900">{totalDivII}</div>
            <div className="text-gray-600 font-medium">Division II Achievers</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-3xl mb-3">🎓</div>
            <div className="text-3xl font-bold text-gray-900">{totalStudents}</div>
            <div className="text-gray-600 font-medium">Total Students</div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 px-6 py-8">
            <h2 className="text-3xl font-bold text-white text-center mb-2">
              8-Year Performance Summary
            </h2>
            <p className="text-blue-200 text-center">
              Consistent excellence in Primary Leaving Examinations by Academic Year
            </p>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 border-b text-gray-700 font-bold text-center">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">📅</span>
                      Academic Year
                    </div>
                  </th>
                  <th className="px-6 py-4 border-b text-gray-700 font-bold text-center">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">⭐</span>
                      Division I
                    </div>
                  </th>
                  <th className="px-6 py-4 border-b text-gray-700 font-bold text-center">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">📚</span>
                      Division II
                    </div>
                  </th>
                  <th className="px-6 py-4 border-b text-gray-700 font-bold text-center">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">💫</span>
                      Division III
                    </div>
                  </th>
                  <th className="px-6 py-4 border-b text-gray-700 font-bold text-center">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">✨</span>
                      Division IV
                    </div>
                  </th>
                  <th className="px-6 py-4 border-b text-gray-700 font-bold text-center">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🎓</span>
                      Total
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((res, index) => (
                  <tr
                    key={academicYears[index]}
                    className="hover:bg-blue-50 transition-colors duration-150 border-b last:border-b-0"
                  >
                    <td className="px-6 py-4 font-bold text-gray-900 text-center">
                      {academicYears[index]}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {res.divI}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {res.divII}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {res.divIII}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {res.divIV}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-center">
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {res.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Note */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-l-4 border-green-500">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">📈</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Consistent Academic Excellence
              </h3>
              <p className="text-gray-600">
                Our performance across academic years stands as a testament to our commitment to 
                academic excellence and continuous improvement. We maintain high standards while 
                ensuring every student reaches their full potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}