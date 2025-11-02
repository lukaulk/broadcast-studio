"use client"
import { AuthForm } from "@/components/auth/form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()

  async function callApi(path: string, body: Record<string, unknown>) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, body: json }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black radio-canada">
      <AuthForm
        mode="login"
        onSubmit={async (data) => {
          try {
            const route = data.name ? "/api/auth/email/signup" : "/api/auth/email/signin"
            const { ok, body } = await callApi(route, data)

            if (!ok) {
              const msg = (body && (body.error || body.message)) || "Failed to sign in"
              toast.error(msg)
              return
            }

            toast.success("Signed in successfully!")
            router.push("/")
            router.refresh()
          } catch {
            toast.error("An unexpected error occurred")
          }
        }}
        onGoogleLogin={async () => {
          try {
            const { ok, body } = await callApi("/api/auth/social", {
              provider: "google",
              callbackURL: "/",
            })

            if (!ok) {
              toast.error((body && (body.error || body.message)) || "Failed to sign in with Google")
              return
            }

            if (body && body.redirect && body.url) {
              window.location.href = body.url
            }
          } catch {
            toast.error("Failed to sign in with Google")
          }
        }}
        onGithubLogin={async () => {
          try {
            const { ok, body } = await callApi("/api/auth/social", {
              provider: "github",
              callbackURL: "/",
            })

            if (!ok) {
              toast.error((body && (body.error || body.message)) || "Failed to sign in with GitHub")
              return
            }

            if (body && body.redirect && body.url) {
              window.location.href = body.url
            }
          } catch {
            toast.error("Failed to sign in with GitHub")
          }
        }}
      />
    </main>
  )
}