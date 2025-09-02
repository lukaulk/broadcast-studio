"use client";
import Footer from "@/components/home/Footer";
import CTASection from "../../components/home/CTASection";
import Features from "../../components/home/Features";
import Header from "../../components/home/Header";
import HeroSection from "../../components/home/HeroSection";

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
