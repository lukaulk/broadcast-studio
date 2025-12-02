"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAsGuest() {
    const cookieStore = await cookies()

    // Set guest session cookie for 30 minutes
    cookieStore.set("guest-session", "true", {
        maxAge: 2 * 60, // 10 minutes in seconds
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    })

    redirect("/studio")
}

export async function logoutGuest() {
    const cookieStore = await cookies()
    cookieStore.delete("guest-session")
    redirect("/login")
}
