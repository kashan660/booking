import type { NextAuthConfig } from "next-auth"
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnProfile = nextUrl.pathname.startsWith('/profile')
      const isLoginPage = nextUrl.pathname === '/login'
      const isAdminLoginPage = nextUrl.pathname === '/admin/login'

      // Admin Area Protection
      if (isOnAdmin) {
        if (isAdminLoginPage) {
          if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl))
          return true
        }
        // Redirect unauthenticated users to admin login specifically
        if (isLoggedIn) return true
        return Response.redirect(new URL('/admin/login', nextUrl))
      }

      // User Profile Protection
      if (isOnProfile) {
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
  },
  providers: [], 
} satisfies NextAuthConfig
