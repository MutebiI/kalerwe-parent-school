export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Simple & Transparent</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">👋</span>
                Straightforward Privacy
              </h2>
              <p className="text-gray-600 mb-6">
                We believe in simple, honest privacy practices. Here's what you need to know as a visitor to our school website.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">📊</span>
                  What We Collect
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Basic analytics (like page views) to improve our site</li>
                  <li>Information you voluntarily provide through our contact form</li>
                  <li>No personal accounts or user logins required</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  How We Use Information
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Improve website content and user experience</li>
                  <li>Respond to inquiries from parents and visitors</li>
                  <li>Understand which school information is most valuable</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">👨‍💼</span>
                  Simple Administration
                </h3>
                <p className="text-gray-600">
                  This website is managed by a single administrator. No complex user data systems - just a straightforward school website.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}