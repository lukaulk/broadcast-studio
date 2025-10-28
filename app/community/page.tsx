import Header from "@/components/home/Header";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react"
import Link from "next/link";
export default function CommunityPage() {
  return (
    <>
      <Header headerText="Community" noHomeLink />
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center">
        <div className="mb-6">
          <h1 className="text-lg sm:text-2xl text-center robik font-semibold">Community Posts</h1>
          <span className="opacity-65">Explore posts and discussions from our vibrant community.</span>
        </div>
        {/* Community Posts Page */}
        <Card className="w-full max-w-3xl mx-auto mb-10 bg-zinc-950 border-zinc-800 shadow-lg">
          
          <CardContent>
            <p className="text-zinc-400">

              <MessageCircleMore className="inline w-5 h-5 mr-2 mb-1 text-zinc-500" />
              Join the conversation, share your experiences, and learn from others in the field of computer network simulation.
            </p>

            <div className="mt-6 flex justify-center" >
              <Link href="/login">
                <Button variant="secondary" className="text-zinc-900 bg-white hover:bg-gray-200 cursor-pointer">
                  Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <span className="text-white hidden">Community!</span>

      </div>
    </>
  );
}
