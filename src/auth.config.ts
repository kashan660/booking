import type { NextAuthConfig } from "next-auth"
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isLoginPage = nextUrl.pathname === '/login'
      const isAdminLoginPage = nextUrl.pathname === '/admin-login'

      // Admin Login Page Logic
      if (isAdminLoginPage) {
        if (isLoggedIn && auth?.user?.role === 'ADMIN') {
          return Response.redirect(new URL('/admin', nextUrl))
        }
        return true
      }

      // Admin Dashboard Protection
      // Check if it's an admin route (excluding the login page which is handled above)
      if (isOnAdmin) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/admin-login', nextUrl))
        }

        if (auth?.user?.role !== 'ADMIN') {
           return Response.redirect(new URL('/profile', nextUrl))
        }

        return true
      }

      // User Profile Protection
      if (nextUrl.pathname.startsWith('/profile')) {
        if (isLoggedIn) return true
        return false // Redirects to /login
      }

      // Public Auth Pages (redirect if already logged in)
      if (isLoginPage || nextUrl.pathname === '/signup') {
        if (isLoggedIn) return Response.redirect(new URL('/profile', nextUrl))
        return true
      }

      return true
    },
    // We need to define jwt and session callbacks here as well so middleware can use them
    // to populate the role in the auth object
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.sub = user.id // Store user ID in token
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role as string
        session.user.id = token.sub as string
      }
      return session
    },
  },
  providers: [], 
} satisfies NextAuthConfig
