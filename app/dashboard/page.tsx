"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// user state types can be improved based on your user model
interface User {
  id: string
  email: string
  name?: string
}

export default function Dashboard() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login")
    }
  }, [session, isPending, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  if (isPending) return <p className="text-white">Loading...</p>
  if (!session?.user) return null

  const user = session.user as User

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Bem-vindo, {user.name || user.email} 👋</h1>
      <button
        className="mt-4 px-4 py-2 bg-red-600 rounded"
        onClick={handleSignOut}
      >
        Sair
      </button>
    </div>
  )
}
