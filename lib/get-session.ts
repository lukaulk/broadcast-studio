import { auth } from "@/lib/auth"
import { cookies } from "next/headers"

export async function getSession() {
    return await auth.api.getSession({
        headers: await cookies(),
    })
}

