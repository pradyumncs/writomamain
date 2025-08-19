import { SignIn } from "@/components/auth-components";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-2xl border-0">
          <CardHeader className="text-center space-y-4 pt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to Writoma
            </h1>
            <p className="text-md text-gray-600">
              Sign in to continue to your dashboard.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              <SignIn
                provider="google"
                callbackUrl={searchParams.callbackUrl}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-7 px-4 rounded-xl text-xl transition-colors shadow-lg shadow-blue-500/50 transform hover:scale-105 flex items-center justify-center"
              >
                <FcGoogle className="mr-3 h-7 w-7" />
                Sign in with Google
              </SignIn>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}