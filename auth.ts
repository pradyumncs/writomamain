import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "/logo.png" }, // use your local logo
  providers: [
    Google,
  ],
  pages: {
    signIn: "/auth/signin",
  },
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (
        pathname === "/" ||
        pathname === "/privacy" ||
        pathname === "/termsconditions" ||
        pathname === "/refunds" ||
        pathname === "/support" ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/auth")
      )
        return true
      return !!auth
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken
      return session
    },
  },
  experimental: { enableWebAuthn: true },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
