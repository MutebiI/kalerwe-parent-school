export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">🍪</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">Light & Uncomplicated</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">🌐</span>
                Simple Cookie Usage
              </h2>
              <p className="text-gray-600 mb-6">
                We use minimal cookies to make our website work properly and understand how visitors use our site.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🔧</span>
                  Essential Cookies
                </h3>
                <p className="text-gray-600">
                  Basic cookies that make the website function properly. These can't be disabled.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">📈</span>
                  Analytics Cookies
                </h3>
                <p className="text-gray-600">
                  We use simple analytics to understand which pages are most popular and how we can improve the site for our school community.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🎛️</span>
                  No Complex Tracking
                </h3>
                <p className="text-gray-600">
                  Since we don't have user accounts or login systems, our cookie usage is straightforward and minimal.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}