// app/login/page.tsx
"use client"
import { AuthForm } from "@/components/auth/form"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black radio-canada">
      <AuthForm
        mode="login"
        onSubmit={async (data) => {
          try {
            const route = data.name ? "/api/auth/email/signup" : "/api/auth/email/signin"
            const res = await fetch(route, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            })
            const json = await res.json()
            console.log(data.name ? "Signup success:" : "Login success:", json)
          } catch (err) {
            console.error("Auth error:", err)
          }
        }}
        onGoogleLogin={async () => {
          try {
            await fetch("/api/auth/social", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: "google",
                callbackURL: "/dashboard",
              }),
            })
          } catch (err) {
            console.error("Google login error:", err)
          }
        }}
        onGithubLogin={async () => {
          try {
            await fetch("/api/auth/social", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: "github",
                callbackURL: "/dashboard",
              }),
            })
          } catch (err) {
            console.error("Github login error:", err)
          }
        }}
      />
    </main>
  )
}
