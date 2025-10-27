"use client";
import Header from "../../components/home/Header";
import HeroSection from "../../components/home/HeroSection";
import Footer from "@/components/home/Footer";
import Features from "@/components/home/Features";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;
