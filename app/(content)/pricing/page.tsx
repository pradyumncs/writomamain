"use client"

import { useMemo, useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type BillingCycle = "monthly" | "annually"

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("annually")

  const plans = useMemo(
    () => [
      {
        name: "Basic",
        annualPrice: 8,
        monthlyLink: "https://checkout.dodopayments.com/buy/pdt_VTYUe3nENUUHeyS40BHxC?quantity=1&redirect_url=https://writoma.com%2Fdashboard",
        annualLink: "https://checkout.dodopayments.com/buy/pdt_cHHUKnKykNBBXgj9tuywE?quantity=1&redirect_url=https://writoma.com%2Fdashboard",
        features: [
          "8,000 Humanizer Words",
          "100 AI Detector Uses",
          "50 Generator Uses",
          "Watermark and Future Proof",
        ],
        cta: "Get Started",
        popular: false,
      },
      {
        name: "Premium",
        annualPrice: 20,
        monthlyLink: "https://checkout.dodopayments.com/buy/pdt_utQjF0HlYfA6Zzce089Qk?quantity=1&redirect_url=https://writoma.com%2Fdashboard",
        annualLink: "https://checkout.dodopayments.com/buy/pdt_VuBALMPYXTUa56e9FZlfu?quantity=1&redirect_url=https://writoma.com%2Fdashboard",
        features: [
          "30,000 Humanizer Words",
          "500 AI Detector Uses",
          "200 Generator Uses",
          "Watermark and Future Proof",
          "Priority Support",
        ],
        cta: "Get Started",
        popular: true,
      },
      {
        name: "Ultimate",
        annualPrice: 40,
        monthlyLink: "https://checkout.dodopayments.com/buy/pdt_1WaNHOXPKisFU8GJgfLJ1?quantity=1&redirect_url=https://writoma.com%2Fdashboard",
        annualLink: "https://checkout.dodopayments.com/buy/pdt_v5MPhELvoKlC41hAENvDw?quantity=1&redirect_url=https://writoma.com%2Fdashboard",
        features: [
          "Unlimited Humanizer Words",
          "Unlimited AI Detector Uses",
          "Unlimited Writing Generator Uses",
          "Watermark and Future Proof",
          "Priority Support",
        ],
        cta: "Get Started",
        popular: false,
      },
    ],
    []
  )

  const computePrice = (annual: number) => {
    if (billing === "annually") return annual
    // Annual is shown as 20% off in the UI (-20% bubble)
    // So monthly is the pre-discount price
    return Math.round((annual / 0.8) * 100) / 100
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3 mb-10 md:mb-14">
        <p className="text-xs tracking-widest text-indigo-600 font-semibold">PRICING</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Choose the plan that's right for you
        </h1>

        {/* Billing cycle toggle */}
        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-gray-100 p-1 text-sm md:text-base">
          <button
            className={
              billing === "monthly"
                ? "rounded-full bg-white px-4 md:px-6 py-2 font-medium shadow"
                : "rounded-full px-4 md:px-6 py-2 text-gray-600"
            }
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            className={
              billing === "annually"
                ? "relative rounded-full bg-white px-4 md:px-6 py-2 font-medium shadow"
                : "relative rounded-full px-4 md:px-6 py-2 text-gray-600"
            }
            onClick={() => setBilling("annually")}
          >
            Annually
            <span className="absolute -right-8 -top-3 inline-flex items-center rounded-full bg-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {plans.map((plan, idx) => {
          const price = computePrice(plan.annualPrice)
          const isPopular = plan.popular
          const link = billing === 'annually' ? plan.annualLink : plan.monthlyLink;
          return (
            <Card
              key={plan.name}
              className={isPopular ? "ring-2 ring-indigo-600 shadow-lg" : ""}
            >
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{plan.name}</p>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-4xl md:text-5xl font-bold">
                        ${price}
                      </span>
                      <span className="mb-1 text-muted-foreground">/ month</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {billing === "annually" ? "billed annually" : "billed monthly"}
                    </p>
                  </div>
                  {isPopular && (
                    <Badge className="bg-indigo-600 text-white">Popular</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href={link} className="w-full">
                  <Button
                    className={`w-full h-12 text-base ${
                      isPopular
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-white text-black border hover:bg-gray-100"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>

              {idx === 0 && (
                <div className="px-6 pb-6 -mt-3 text-xs text-muted-foreground">
                  Starter plan for light usage with essential features.
                </div>
              )}
              {idx === 2 && (
                <div className="px-6 pb-6 -mt-3 text-xs text-muted-foreground">
                  Unlimited access to all features for power users.
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
