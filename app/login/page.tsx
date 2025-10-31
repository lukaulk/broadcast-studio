"use client"

import { AuthForm } from "@/components/auth/form"
import { auth } from "@/lib/auth"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black radio-canada">
      <AuthForm
        mode="login"
        onSubmit={async (data) => {
          try {
            if (data.name) {
              // Signup
              const res = await auth.api.signUpEmail({
                body: {
                name: data.name,
                email: data.email,
                password: data.password,
              },
              })
              console.log("Signup success:", res)
            } else {
              // Login
              const res = await auth.api.signInEmail({
                body: {
                email: data.email,
                password: data.password,
              },
              })
              console.log("Login success:", res)

            }
          } catch (err) {
            console.error("Auth error:", err)
          }
        }}
        onGoogleLogin={async () => {
          try {
            await auth.api.signInSocial({
              body: {
              provider: "google",
              callbackURL: "/dashboard",
              }
            })
          } catch (err) {
            console.error("Google login error:", err)
          }
        }}
        onGithubLogin={async () => {
          try {
            await auth.api.signInSocial({
              body: {
              provider: "github",
              callbackURL: "/dashboard",
              }
            })
          } catch (err) {
            console.error("Github login error:", err)
          }
        }}
      />
    </main>
  )
}
