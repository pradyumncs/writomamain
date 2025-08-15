import { auth } from "auth"  // wrapper around getServerSession
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PenSquare, ShieldCheck, Lock } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  const userEmail = session?.user?.email
  const firstName = session?.user?.name?.split(" ")[0] || "User"

  // Default plan
  let currentPlan = "Free"
  let subscriptionId: string | null = null

  if (userEmail) {
    // Look up subscription by email in Supabase
    const { data: subs, error } = await supabase
      .from("subscriptions")
      .select("status, subscription_id")
      .eq("email", userEmail)
      .eq("status", "active")
      .limit(1)
      .maybeSingle()

    if (!error && subs) {
      currentPlan = "Pro"
      subscriptionId = subs.subscription_id
    }
  }

async function cancelSubscription() {
  "use server"

  if (!subscriptionId) return

  await fetch("/api/subscription/cancel", {
    method: "PATCH", // 👈 important
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscriptionId }),
  })
}

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome, {firstName} 👋
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-lg text-gray-600">Current Plan:</p>
            <Badge
              variant="secondary"
              className={`w-fit ${
                currentPlan === "Pro"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-700 border border-gray-200"
              }`}
            >
              {currentPlan}
            </Badge>
          </div>
        </div>

        {/* Cancel button only if Pro */}
        {currentPlan === "Pro" && (
          <form action={cancelSubscription}>
            <Button type="submit" variant="destructive" className="mt-4">
              Cancel Subscription
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
