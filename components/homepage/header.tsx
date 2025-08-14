import Link from "next/link"

export default function TopHeader() {
  return (
    <div className="pt-16 sm:pt-24 text-center mb-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Font size increased from text-3xl sm:text-4xl to text-4xl sm:text-6xl */}
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 animate-in fade-in slide-in-from-top-4 duration-1000 leading-relaxed">
        Humanize AI Text & Outsmart AI Detectors
      </h1>
      <p className="text-md sm:text-lg text-gray-600 mb-6 animate-in fade-in slide-in-from-top-4 duration-1000 delay-200">
        Writoma converts your AI-generated content into fully humanized,
        undetectable writing—ensuring it passes every AI detection tool
      </p>
      <Link href="/dashboard">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors shadow-lg shadow-blue-500/50 transform hover:scale-105">
          Try for free
        </button>
      </Link>
    </div>
  )
}