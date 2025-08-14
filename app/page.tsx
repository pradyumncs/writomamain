"use client"

import Feature1 from "@/components/homepage/feature1"
import UserSay from "@/components/homepage/usersay"
import FAQ from "@/components/homepage/faq"
import TopHeader from "@/components/homepage/header"
import EthicalPolicy from "@/components/homepage/ethicalpolicy"
import ScrollColleges from "@/components/homepage/scrollcolleges"
import Image from "next/image"
import GetStartedBottom from "@/components/homepage/getstartedbottom"
import Header from "@/components/header"
import Footer from "@/components/homepage/footer"

export default function Index() {

  return (
    <div className="min-h-screen bg-white">
  
    
      <TopHeader />
      {/* Dashboard Image */}
      <div className="flex justify-center mb-12 px-4">
        <div className="relative max-w-5xl">
          <Image
            src="/homedash.png"
            alt="Dashboard Preview"
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
      <div className="my-12">
      <ScrollColleges />
      </div>
    
      <Feature1 />
      <div className="my-12">
        <UserSay />
      </div>
      <FAQ />
      <EthicalPolicy />
      <GetStartedBottom />
      <Footer />
    </div>
  )
}
