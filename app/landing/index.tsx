"use client";
import Footer from "@/src/components/Footer";
import CTASection from "../../src/components/CTASection";
import Features from "../../src/components/Features";
import Header from "../../src/components/Header";
import HeroSection from "../../src/components/HeroSection";

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
