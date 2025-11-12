"use client";

export default function Enrollment() {
  // Consistent file names - staff just replaces these files
  const documents = {
    requirements: {
      title: "School Requirements",
      description: "Complete list of admission requirements, required documents, and school policies.",
      fileName: "school-requirements.pdf",
      downloadName: "Kalerwe Parent-School-Requirements.pdf",
      icon: "🏫",
      color: "blue"
    },
    enrollment: {
      title: "Enrollment Form", 
      description: "Official enrollment application form for new students.",
      fileName: "enrollment-form.pdf",
      downloadName: "Kalerwe Parent-School-Enrollment-Form.pdf",
      icon: "✏️",
      color: "green"
    }
  };
  {
    console.log("This is the first line ")
    // this is the line -----1
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enrollment Package
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Download the required forms to begin your child's journey at Starlight School
          </p>
        </div>

        {/* Emphasis Box */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">📋</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Important: School Presentation Required
              </h3>
              <p className="text-yellow-700">
                All forms must be <strong>printed, filled out, and presented in person</strong> at the school office. 
                This allows for direct parent-teacher interaction and ensures we provide personalized attention to every child's needs.
              </p>
            </div>
          </div>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {Object.entries(documents).map(([key, doc]) => (
            <div key={key} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`bg-${doc.color}-600 px-6 py-8 text-center`}>
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">{doc.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{doc.title}</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{doc.description}</p>
                <ul className="text-sm text-gray-500 mb-6 space-y-2">
                  {key === 'requirements' && (
                    <>
                      <li>• Required documents checklist</li>
                      <li>• Admission criteria</li>
                      <li>• School rules & policies</li>
                      <li>• Uniform requirements</li>
                    </>
                  )}
                  {key === 'enrollment' && (
                    <>
                      <li>• Student information section</li>
                      <li>• Parent/guardian details</li>
                      <li>• Medical information</li>
                      <li>• Emergency contacts</li>
                    </>
                  )}
                </ul>
                <a
                  href={`/documents/${doc.fileName}`}
                  download={doc.downloadName}
                  className={`block w-full bg-${doc.color}-600 text-white text-center py-3 px-4 rounded-lg hover:bg-${doc.color}-700 transition font-semibold`}
                >
                  📥 Download {doc.title} PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      
        {/* Simple Update Instructions */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">🔄 How to Update Forms</h3>
          <p className="text-blue-700 text-sm">
            <strong>To update forms:</strong> Simply replace the PDF files in the documents folder with new versions 
            using the <strong>exact same file names</strong>. The website will automatically show the latest versions.
          </p>
        </div> */}

        {/* Next Steps Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Next Steps After Download</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Print & Fill</h4>
              <p className="text-gray-600 text-sm">Print both forms and fill them out completely</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Gather Documents</h4>
              <p className="text-gray-600 text-sm">Collect all required documents from requirements list</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Visit School</h4>
              <p className="text-gray-600 text-sm">Bring everything to school for personal processing</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM<br />
            <strong>Location:</strong> Kalerwe Parent School, Kampala Uganda<br />
            <strong>Contact:</strong> +256 704 267 770
          </p>
        </div>

      </div>
    </div>
  );
}