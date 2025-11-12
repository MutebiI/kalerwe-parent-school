export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-lg text-gray-600">Important Information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">🏫</span>
                General Information
              </h2>
              <p className="text-gray-600 mb-6">
                This website provides general information about Kalerwe Parent School. For official matters, please contact the school directly.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">📚</span>
                  Educational Content
                </h3>
                <p className="text-gray-600">
                  While we strive for accuracy, school information may change. Always verify important details through official school channels.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🔗</span>
                  External Links
                </h3>
                <p className="text-gray-600">
                  Our website may link to external resources. We're not responsible for content on third-party sites.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">👨‍💻</span>
                  Website Administration
                </h3>
                <p className="text-gray-600">
                  This website is maintained by a single administrator. Content updates are made as needed to keep information current.
                </p>
              </section>

              <section className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="flex items-start">
                  <div className="text-xl mr-3">💡</div>
                  <p className="text-gray-700">
                    <strong>Note:</strong> For official school communications, admissions, or urgent matters, please contact the school administration directly through provided official channels.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}