import Link from "next/link";

export default function GetStartedBottom() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="w-full text-center">
        <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-4">
          READY TO GET STARTED?
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          Start humanizing your content today.
        </h2>
        <Link href="/dashboard">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] transform hover:scale-105">
            Get started for free
          </button>
        </Link>
      </div>
    </section>
  )
}