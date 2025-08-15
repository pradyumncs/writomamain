"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"

export default function DashboardClient({
  firstName,
  userEmail,
  currentPlan,
  subscription,
}: {
  firstName: string
  userEmail: string
  currentPlan: string
  subscription: any
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {firstName} 👋</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Email:</strong> {userEmail || "Not logged in"}
        </div>

        <div className="flex items-center gap-2">
          <strong>Current Plan:</strong>
          <Badge>{currentPlan}</Badge>
        </div>

        {subscription ? (
          <ManageSubscription subscription={subscription} />
        ) : (
          <Link href="/pricing">
            <Button variant="default">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

function ManageSubscription({ subscription }: { subscription: any }) {
  const [cancelled, setCancelled] = useState(false)

  return (
    <div className="space-y-2 border-t pt-4">
      <div className="text-sm text-muted-foreground">
        Subscription ID: {subscription.id}
      </div>

      <div className="text-sm">
        Status: {cancelled ? "cancellation scheduled" : subscription.status}
      </div>

      <div className="text-sm">
        Renews: {new Date(subscription.current_period_end).toLocaleDateString()}
      </div>

      {!cancelled ? (
        <Button
          variant="destructive"
          onClick={() => setCancelled(true)}
        >
          Cancel Subscription
        </Button>
      ) : (
        <Badge variant="destructive">Cancellation Scheduled</Badge>
      )}
    </div>
  )
}
