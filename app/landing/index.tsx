"use client"
import Footer from '@/src/components/home/Footer';
import CTASection from '../../src/components/home/CTASection';
import Features from '../../src/components/home/Features';
import Header from '../../src/components/home/Header';
import HeroSection from '../../src/components/home/HeroSection';



const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Header />
        <HeroSection />
        <Features />
        <CTASection />
        <Footer />
    </div>
  );
};

export default HomePage;