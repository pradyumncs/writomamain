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

  if (userEmail) {
    // Look up subscription by email in Supabase
    const { data: subs, error } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("email", userEmail)
      .eq("status", "active")
      .limit(1)
      .maybeSingle()

    if (!error && subs) {
      currentPlan = "Pro"
    }
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

        {/* Example: unlock Writing Generator if Pro */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-900">Upgrade to use all</CardTitle>
              <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                <PenSquare className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentPlan === "Pro" ? (
              <>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Unlimited Access 🚀</p>
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Start Writing →
                </Button>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Lock className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Upgrade to use</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                  disabled
                >
                  Upgrade to use
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
