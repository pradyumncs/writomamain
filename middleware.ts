export { auth as middleware } from "auth"

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - homedash.png (the image you want to be public)
     * - / (the root path)
     * - /colleges/ (the colleges images)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|homedash.png|logo.png|/logo.png|colleges/|/colleges/|$).*)",
  ],
}
