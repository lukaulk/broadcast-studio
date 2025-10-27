import {  Network, Shield, Users } from "lucide-react";


export default function Features() {
    const id = "features";
    
    return (
         <section id={id} className="py-20 bg-gradient-to-b from-black to-cyan-900/30 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl mb-6">
                Why
              <span className="font-bold" translate="no"> Broadcast Studio</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Designed for networking students and professionals, offering a complete and acessible simulation experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors">
                <Network className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Complete Simulation</h3>
              <p className="text-gray-400 leading-relaxed">
                Simulate complex networks with routers, switches, PCs, and IoT devices.
                    Full support for modern network protocols.
              </p>
            </div>

            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Open Source</h3>
              <p className="text-gray-400 leading-relaxed">
               Open source and free forever. Contribute to the community
and customize to your needs.
              </p>
            </div>

            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Cross-platform</h3>
              <p className="text-gray-400 leading-relaxed">
               Works perfectly on Windows, Linux, and macOS.
A single tool for all your devices.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
}