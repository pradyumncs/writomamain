import { Rocket, Search, ShieldCheck, Voicemail } from "lucide-react"

const features = [
  {
    name: "Detect AI Text Instantly",
    description:
      "Easily detect if content was written by AI or a human. Our AI checker helps you spot robotic writing patterns – ideal for anyone needing to review, revise, or bypass AI detection with confidence.",
    icon: <Search />,
  },
  {
    name: "Save Time & Keep Quality",
    description:
      "Polish your AI-generated drafts without starting over. Humanize AI text quickly while preserving your original ideas — perfect for students, marketers, and writers who need fast, high-quality results.",
    icon: <Rocket />,
  },
  {
    name: "Make AI Text Sound Human",
    description:
      "Transform robotic output into natural, readable language. Our tool helps you humanize text from ChatGPT, convert AI to humanized text, and rewrite content that passes most AI detectors — all for free.",
    icon: <Voicemail />,
  },
  {
    name: "Private & Secure",
    description:
      "We never store your data. Everything happens in real time — making Writoma the safest way to bypass AI detectors and humanize text AI-style without privacy concerns.",
    icon: <ShieldCheck />,
  },
]

const trustedBy = [
  "GPTZero",
  "OpenAI",
  "Writer",
  "QuillBot",
  "Copyleaks",
  "Turnitin",
  "Grammarly",
  "ZeroGPT",
]
export default function Feature1() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="w-full mb-8 lg:mb-16">
          <div className="w-full mb-4">
            <h2 className="text-lg sm:text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
              Bypass AI content detectors
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {trustedBy.map((item, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <svg
                  className="w-4 h-4 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-sm sm:text-base font-semibold text-gray-500 dark:text-gray-400 text-center">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mb-8 lg:mb-16">
          <h2 className="mb-4 text-2xl sm:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
            Key features of Writoma
          </h2>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-600 lg:h-12 lg:w-12 dark:bg-primary-900 text-white">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg sm:text-xl font-bold dark:text-white">
                {feature.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
