import { Download, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import FeatureSubscribeDialog from "./NewsletterDialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex mt-10 items-center justify-center ">
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

        <div className="mb-6 mt-12">
          <div className="inline-flex items-center py-2 px-4 rounded-full text-sm border border-zinc-500 bg-zinc-900" translate="no">
            <Zap className="w-4 h-4 mr-1"  /> GNS3 & Packet Tracer <b className="ml-1">Alternative</b>
          </div>
        </div>
        <h1 className="relative text-4xl sm:text-6xl lg:text-6xl rubik mb-6 text-white" >
          Open Source 
          <br />
          <span className="font-semibold">
            Computer Network Simulator
          </span>
        </h1>
        <p className="text-xl sm:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed radio-canada">
          An platform for studying computer networks, network simulation, and
          hands-on learning with integrated
          <br />
          <span className="text-zinc-200">artificial intelligence.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center radio-canada">
          <Link href="/studio" className="group">
            <button
              type="button"
              className="group bg-gradient-to-r cursor-pointer text-zinc-200 px-8 py-4 rounded-sm font-semibold text-lg  hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-400/25"
            >
              <span className="flex items-center">
                Try Demo Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
          <FeatureSubscribeDialog
            featureName="Windows Version"
            triggerText="Notify me"
            buttonTrigger={
              <button
                type="button"
                className="group cursor-pointer border-2 border-gray-600 text-white px-8 py-4 rounded-sm font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
              >
                <span className="flex items-center" translate="no">
                  <Download className="w-5 h-5 mr-2" />
                  Download for windows
                </span>
              </button>
            }
          />
        </div>
          <div className="flex w-full flex-col items-center justify-center mt-12 gap-5">
             <span className="radio-canada text-lg font-bold">Contributors</span>
            <div className="*:data-[slot=avatar]:ring-background flex items-center justify-center -space-x-2 *:data-[slot=avatar]:w-15 *:data-[slot=avatar]:h-15 *:data-[slot=avatar]:ring-4">
              <Avatar>
                <AvatarImage src="/peaple/LN.jpg" alt="@lukaundombele" />
                <AvatarFallback>LK</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="/peaple/LN2.png"
                  alt="ElvisOzano"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
    </section>
  );
}
