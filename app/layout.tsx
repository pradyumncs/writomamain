import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Writoma",
  description:
    "Writoma converts your AI-generated content into fully humanized, undetectable writing",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <body className={inter.className}>
        <div className="flex h-full min-h-screen w-full flex-col justify-between">
          <main className="w-full flex-auto py-4 md:py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
