"use client"

import { AuthForm } from "@/components/auth/form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function SignUpPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black radio-canada">
      <AuthForm
        mode="signup"
        onSubmit={async (data) => {
          try {
            if (!data.name) {
              toast.error("Name is required")
              return
            }

            const result = await authClient.signUp.email({
              email: data.email,
              password: data.password,
              name: data.name,
              callbackURL: "/dashboard",
            })

            if (result.error) {
              toast.error(result.error.message || "Failed to sign up")
              return
            }

            toast.success("Account created successfully!")
            router.push("/dashboard")
            router.refresh()
          } catch {
            toast.error("An unexpected error occurred")
          }
        }}
        onGoogleLogin={async () => {
          try {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            })
          } catch {
            toast.error("Failed to sign in with Google")
          }
        }}
        onGithubLogin={async () => {
          try {
            await authClient.signIn.social({
              provider: "github",
              callbackURL: "/dashboard",
            })
          } catch {
            toast.error("Failed to sign in with GitHub")
          }
        }}
      />
    </main>
  )
}
