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
      const isAdminLoginPage = nextUrl.pathname === '/admin/signin'

      // Admin Area Protection
      if (isOnAdmin) {
        if (isAdminLoginPage) {
          // If already logged in as ADMIN, redirect to dashboard
          if (isLoggedIn && auth?.user?.role === 'ADMIN') {
            return Response.redirect(new URL('/admin', nextUrl))
          }
          // If logged in as USER, allow them to see login page (or redirect to profile?)
          // Better to let them sign in as admin if they have different creds, 
          // or if it's the same account but wrong role, show error.
          // For now, let's just allow access to login page.
          return true
        }
        
        // Redirect unauthenticated users to admin login
        if (!isLoggedIn) {
          return Response.redirect(new URL('/admin/signin', nextUrl))
        }

        // Check for ADMIN role
        if (auth?.user?.role !== 'ADMIN') {
           // Redirect unauthorized users to their profile or home
           return Response.redirect(new URL('/profile', nextUrl))
        }

        return true
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
    // We need to define jwt and session callbacks here as well so middleware can use them
    // to populate the role in the auth object
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  providers: [], 
} satisfies NextAuthConfig
