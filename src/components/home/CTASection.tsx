import { Play } from 'lucide-react';

export default function CTASection() {
    return (
    <section className="py-20 bg-gradient-to-b from-cyan-300/10 to-blue-900/10 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to revolutionize your 
            <br />
            <span className="text-cyan-400">networking learning?</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of students and professionals already using Broadcast Studio
          </p>
          
          <button className="group bg-gradient-to-r cursor-pointer from-cyan-400 to-blue-500 text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-400/25">
            <span className="flex items-center">
              Try it for free
              <Play className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

    );
}