"use client"

import { auth } from "@/lib/auth"
import { useEffect, useState } from "react"

// user state types can be improved based on your user model
interface User {
  id: string
  email: string
  name?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await auth.api.getSession({headers: {}})
        if (session?.user) {
          setUser(session.user as User)
        }
        } catch (err) {
        throw new Error(`Failed to fetch user session: ${err}`)
        }
    }
    fetchUser()
  }, [])

  if (!user) return <p className="text-white">Loading...</p>

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Bem-vindo, {user.name || user.email} 👋</h1>
      <button
        className="mt-4 px-4 py-2 bg-red-600 rounded"
        onClick={() => auth.api.signOut({headers: {}})}
      >
        Sair
      </button>
    </div>
  )
}
