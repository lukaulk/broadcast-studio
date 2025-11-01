// app/login/page.tsx
"use client"
import { AuthForm } from "@/components/auth/form"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black radio-canada">
      <AuthForm
        mode="login"
        onSubmit={async (data) => {
          try {
            const result = await authClient.signIn.email({
              email: data.email,
              password: data.password,
              callbackURL: "/dashboard",
            })

            if (result.error) {
              toast.error(result.error.message || "Failed to sign in")
              return
            }

            toast.success("Signed in successfully!")
            router.push("/dashboard")
            router.refresh()
          } catch (err) {
            toast.error("An unexpected error occurred")
          }
        }}
        onGoogleLogin={async () => {
          try {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            })
          } catch (err) {
            toast.error("Failed to sign in with Google")
          }
        }}
        onGithubLogin={async () => {
          try {
            await authClient.signIn.social({
              provider: "github",
              callbackURL: "/dashboard",
            })
          } catch (err) {
            toast.error("Failed to sign in with GitHub")
          }
        }}
      />
    </main>
  )
}
