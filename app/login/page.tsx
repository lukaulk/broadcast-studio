"use client"

import { AuthForm } from "@/components/auth/form"


export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black radio-canada">
      <AuthForm
        mode="login"
        onSubmit={async (data) => {
          console.log("Form submitted:", data)
          // Add your authentication logic here
        }}
        onGoogleLogin={async () => {
          console.log("Google login clicked")
          // Add your Google OAuth logic here
        }}
      />
    </main>
  )
}
