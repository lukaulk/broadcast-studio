"use client";
import Header from "../../components/home/Header";
import HeroSection from "../../components/home/HeroSection";
import Footer from "@/components/home/Footer";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;
