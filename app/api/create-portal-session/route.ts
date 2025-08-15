// app/api/create-portal-session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from 'auth'

// Using TEST environment for Dodo Payments
const DODO_BASE_URL = 'https://test.dodopayments.com'

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Handle both JSON and form data
    let customerId: string | null = null
    
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      const body = await request.json()
      customerId = body.customerId
    } else {
      // Handle form data
      const formData = await request.formData()
      customerId = formData.get('customerId') as string
    }

    if (!customerId) {
      console.error('Missing customer ID')
      return NextResponse.redirect(new URL('/dashboard?error=missing_customer_id', request.url))
    }

    console.log('Creating customer portal session for:', customerId)

    // Create customer portal session with Dodo Payments TEST API
    const response = await fetch(
      `${DODO_BASE_URL}/customers/${customerId}/customer-portal/session`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          send_email: false // Set to true if you want to email the link
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Dodo Payments API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      
      return NextResponse.redirect(
        new URL('/dashboard?error=portal_creation_failed', request.url)
      )
    }

    const data = await response.json()
    console.log('Portal session created successfully:', data)
    
    // Redirect user to the customer portal with 303
    return NextResponse.redirect(data.link, 303)

  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.redirect(
      new URL('/dashboard?error=internal_error', request.url)
    )
  }
}
