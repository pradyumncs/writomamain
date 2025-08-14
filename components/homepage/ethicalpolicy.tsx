import React from "react"

const SimpleShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
  </svg>
)

const BanIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-red-500 mr-2 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
)

const EthicalPolicy = () => {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <div className="flex items-center mb-6">
            <SimpleShieldIcon />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white ml-4">
              Ethical Use Policy
            </h1>
          </div>

          <div className="flex items-start bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
            <BanIcon />
            <p className="text-red-800 dark:text-red-200 text-sm sm:text-base">
              Writoma is not a tool for academic dishonesty or cheating.
            </p>
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <p>
            Writoma is built to enhance the quality, tone, and clarity of
              AI-generated content. Our mission is to help users humanize AI
              text responsibly — making it sound more natural and effective
              without compromising ethical standards.
            </p>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                We do not support or condone the use of Writoma for:
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Academic dishonesty or cheating</li>
                <li>
                  Circumventing academic AI detection tools like Turnitin or
                  GPTZero
                </li>
                <li>
                  Misrepresenting AI-generated content as original human work in
                  academic settings
                </li>
                <li>Any form of plagiarism or academic misconduct</li>
              </ul>
            </div>

            <p>
              Our platform is intended for ethical content improvement only —
              including editing AI drafts for tone, clarity, and readability in
              professional, creative, or personal contexts.
            </p>

            <p>
              We strongly encourage responsible use and adherence to
              institutional and ethical guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EthicalPolicy

