import { Download, Play, Zap } from "lucide-react";
import Image from "next/image";
import NetworkPattern from "./NetworkPattern";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <NetworkPattern />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex w-full mx-auto justify-center mt-5 sm:mt-0 mb-8">
          <Image src="/favicon.png" alt="Broadcast Studio Logo" width={82} height={82} />
        </div>
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1  rounded-full text-sm bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
            <Zap className="w-4 h-4 mr-1" />
            Open Source - <b className="ml-2"> Packet Tracer Alternative</b>
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white sm:bg-gradient-to-r sm:from-white sm:via-gray-100 sm:to-cyan-400 sm:bg-clip-text sm:text-transparent">
          Powerful App
          <br />
          <span className="relative">
            Network Emulator
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform rotate-1" />
          </span>
        </h1>

        <p className="text-xl sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          An platform for studying computer networks, network simulation, and hands-on learning with
          integrated
          <br />
          <span className="text-cyan-400">artificial intelligence.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            className="group bg-gradient-to-r cursor-pointer from-cyan-400 to-blue-500 text-black px-8 py-4 rounded-full font-semibold text-lg  hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-400/25"
          >
            <span className="flex items-center">
              Try Beta Now
              <Play className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            type="button"
            className="group cursor-pointer border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
          >
            <span className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download for windows
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
