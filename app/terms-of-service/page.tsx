export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">📜</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Basic website usage terms</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">🏫</span>
                Website Usage Agreement
              </h2>
              <p className="text-gray-600 mb-6">
                By using our school website, you agree to these simple terms that ensure a positive experience for all visitors.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">✅</span>
                  Appropriate Use
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use website content for personal, non-commercial purposes</li>
                  <li>Respect our school community and values</li>
                  <li>Provide accurate information when contacting us</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">❌</span>
                  What Not to Do
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Don't attempt to hack or disrupt the website</li>
                  <li>Don't use automated tools to scrape content</li>
                  <li>Don't submit false information through forms</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Content Accuracy
                </h3>
                <p className="text-gray-600">
                  We strive to keep school information accurate and up-to-date, but always verify critical details through official school channels.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}