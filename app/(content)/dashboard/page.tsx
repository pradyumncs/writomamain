import { auth } from "auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PenSquare, ShieldCheck, Lock } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  
  // Extract first name from session
  const firstName = session?.user?.name?.split(' ')[0] || 'User'
  
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
            <Badge variant="secondary" className="w-fit bg-gray-100 text-gray-700 border border-gray-200">
              Free
            </Badge>
          </div>
          <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
            Upgrade Plan
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Humanizer Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">Humanizer</CardTitle>
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                  <PenSquare className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">250</div>
                <p className="text-sm text-gray-600">words available</p>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Start using →
              </Button>
            </CardContent>
          </Card>

          {/* AI Detector Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">AI Detector</CardTitle>
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                  <ShieldCheck className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">0</div>
                <p className="text-sm text-gray-600">uses this month</p>
                <p className="text-xs text-gray-500 mt-1">5 uses remaining</p>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Start using →
              </Button>
            </CardContent>
          </Card>

          {/* Writing Generator Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">Writing Generator</CardTitle>
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                  <PenSquare className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">250</div>
              <p className="text-sm text-gray-600">Words Left</p>
            </div>
          </Card>
          <Card className="p-4 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <p className="text-sm text-gray-600">Detections Left</p>
            </div>
          </Card>
          <Card className="p-4 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-sm text-gray-600">Documents</p>
            </div>
          </Card>
          <Card className="p-4 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">Free</div>
              <p className="text-sm text-gray-600">Current Plan</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}