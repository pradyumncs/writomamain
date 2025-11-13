// app/dashboard/page.tsx
import { auth } from "auth"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PenSquare, ShieldCheck, Lock, Settings, ExternalLink, AlertCircle } from "lucide-react"
import { Suspense } from "react"

export default async function DashboardPage() {
  const session = await auth()
  const userEmail = session?.user?.email
  const firstName = session?.user?.name?.split(" ")[0] || "User"

  // Default plan and customer data
  let currentPlan = "Free"
  let customerId = null
  let subscriptionError = null

  if (userEmail) {
    try {
      // Look up subscription and customer_id by email in Supabase
      const { data: subs, error } = await supabase
        .from("subscriptions")
        .select("status, customer_id")
        .eq("email", userEmail)
        .eq("status", "active")
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error('Supabase error:', error)
        subscriptionError = 'Failed to load subscription data'
      } else if (subs) {
        currentPlan = "Pro"
        customerId = subs.customer_id
      }
    } catch (error) {
      console.error('Database connection error:', error)
      subscriptionError = 'Database connection failed'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Error Handler */}
        <Suspense fallback={null}>
          
        </Suspense>

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
            {subscriptionError && (
              <Badge variant="destructive" className="w-fit text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Subscription Error
              </Badge>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Subscription Management Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">Subscription</CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <Settings className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptionError ? (
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <p className="text-sm text-red-600 mb-2">
                    {subscriptionError}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              ) : currentPlan === "Pro" ? (
                <>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <ShieldCheck className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Pro subscription active
                    </p>
                  </div>
                  
                  {customerId ? (
                    <>
                      {/* Form-based portal access (more reliable for server actions) */}
                      <form action="/api/create-portal-session" method="POST" target="_blank" className="space-y-2">
                        <input type="hidden" name="customerId" value={customerId} />
                        <p className="text-xs text-gray-500 text-center">
                          Manage billing, payment methods & subscription
                        </p>
                        <Button 
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          Cancel Subscription
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </form>
                      
                      <div className="text-xs text-gray-400 text-center">
                        Customer ID: {customerId.slice(0, 8)}...
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500 text-center">
                      Billing portal setup pending. Contact support if you need help managing billing.
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Upgrade to Pro for unlimited access and advanced features
                    </p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Upgrade to Pro →
                  </Button>
                  <div className="text-xs text-gray-400 text-center">
                    • Unlimited writing generation
                    • Priority support
                    • Advanced features
                  </div>
                </>
              )}
            </CardContent>
          </Card>

        
          {/* Analytics/Usage Card */}
     
        </div>

        {/* Testing Info (Remove in production) */}

      </div>
    </div>
  )
}