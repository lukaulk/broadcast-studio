import { Github, Twitter, Network } from "lucide-react";

export default function Footer() {
    return (
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Network className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold">Broadcast Studio</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://github.com/lukaulk/broadcast-studio" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://x.com/lukaudev" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Broadcast Studio. Open source and free to the community.</p>
          </div>
        </div>
      </footer>
    );  
}