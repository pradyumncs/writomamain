export interface Billing {
    city: string;
    country: string;
    state: string;
    street: string;
    zipcode: string;
}

export interface Customer {
    customer_id: string;
    email: string;
    name: string;
}

export interface Data {
    addons: any[];
    billing: Billing;
    cancel_at_next_billing_date: boolean;
    cancelled_at: string | null;
    created_at: string;
    currency: string;
    customer: Customer;
    discount_id: string | null;
    metadata: Record<string, any>;
    next_billing_date: string;
    on_demand: boolean;
    payload_type: string;
    payment_frequency_count: number;
    payment_frequency_interval: string;
    previous_billing_date: string;
    product_id: string;
    quantity: number;
    recurring_pre_tax_amount: number;
    status: string;
    subscription_id: string;
    subscription_period_count: number;
    subscription_period_interval: string;
    tax_inclusive: boolean;
    trial_period_days: number;
}

export interface WebhookPayload {
    business_id: string;
    data: Data;
    timestamp: string;
    type: string;
}