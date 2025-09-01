"use client"
import React from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import { Network, Play, Users, Shield, Github, Twitter } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Header />
        <HeroSection />
     
      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Por que escolher o 
              <span className="text-cyan-400"> Broadcast Studio</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Desenvolvido para estudantes e profissionais de redes, oferecendo uma experiência completa de simulação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors">
                <Network className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Simulação Completa</h3>
              <p className="text-gray-400 leading-relaxed">
                Simule redes complexas com roteadores, switches, PCs e dispositivos IoT. 
                Suporte completo a protocolos de rede modernos.
              </p>
            </div>

            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Open Source</h3>
              <p className="text-gray-400 leading-relaxed">
                Código aberto e gratuito para sempre. Contribua com a comunidade 
                e customize conforme suas necessidades.
              </p>
            </div>

            <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Multiplataforma</h3>
              <p className="text-gray-400 leading-relaxed">
                Funciona perfeitamente no Windows, Linux e macOS. 
                Uma única ferramenta para todos os seus dispositivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Pronto para revolucionar
            <br />
            <span className="text-cyan-400">seu aprendizado de redes?</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-8">
            Junte-se a milhares de estudantes e profissionais que já usam o Broadcast Studio
          </p>
          
          <button className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-400/25">
            <span className="flex items-center">
              Experimentar Gratuitamente
              <Play className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Network className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold">Broadcast Studio</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Broadcast Studio. Código aberto e gratuito para a comunidade.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;