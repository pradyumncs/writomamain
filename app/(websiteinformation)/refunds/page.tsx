import Head from 'next/head';

const RefundPolicy = () => {
  return (
    <>
      <Head>
        <title>Refund Policy</title>
        <meta name="description" content="Refund policy for our SaaS service." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <main className="bg-white p-6 md:p-10 rounded-lg shadow-md max-w-3xl w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Refund Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: August 16, 2025
          </p>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
              Our Commitment
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our goal is to provide a high-quality service that you find valuable.
              Due to the nature of our digital services, we have a strict no-refund policy.
              This policy is in place because, upon subscription, you are granted immediate access
              to our digital content and services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
              Subscription Fees
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All subscription fees are non-refundable. When you purchase a subscription,
              you are agreeing to this policy. We do not offer refunds or credits for partially
              used subscription periods.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
              Canceling Your Subscription
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You are free to cancel your subscription at any time. Upon cancellation,
              you will continue to have access to the service through the end of your
              current billing period. You will not be charged for any subsequent billing cycles
              after cancellation.
            </p>
            <p className="text-gray-600 leading-relaxed">
              To cancel your subscription, please visit the billing section of your account settings.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
              Exceptions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The only exception to our no-refund policy is if we are required by law
              to issue a refund. This will be determined on a case-by-case basis and is
              at our sole discretion, in accordance with applicable consumer protection laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this refund policy from time to time. We will notify you of any
              changes by posting the new policy on this page. We encourage you to review
              this policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about our Refund Policy, please contact us at:
              <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline ml-1">
                support@yourcompany.com
              </a>
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default RefundPolicy;