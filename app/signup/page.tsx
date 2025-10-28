"use client"

import { AuthForm } from "@/components/auth/form"

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black radio-canada">
      <AuthForm
        mode="signup"
        onSubmit={async (data) => {
          console.log("Sign up submitted:", data)
          // Add your sign up logic here
        }}
        onGoogleLogin={async () => {
          console.log("Google login clicked")
          // Add your Google OAuth logic here
        }}
      />
    </main>
  )
}
