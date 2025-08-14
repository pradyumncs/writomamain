export default function TopHeader() {
  return (
    <div className="text-center mb-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-in fade-in slide-in-from-top-4 duration-1000">
        Humanize AI Text & Outsmart AI Detectors
      </h1>
      <p className="text-md sm:text-lg text-gray-600 mb-6 animate-in fade-in slide-in-from-top-4 duration-1000 delay-200">
      Writoma converts your AI-generated content into fully humanized,
        undetectable writing—ensuring it passes every AI detection tool
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors animate-in fade-in slide-in-from-top-4 duration-1000 delay-400">
        Try for free
      </button>
    </div>
  )
}
