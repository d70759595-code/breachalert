import React from 'react';
import { Navbar } from '../components/Navbar';
import { PricingSection } from '../components/PricingSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#FF6A2A] selection:text-black bg-noise relative">
      <Navbar />
      <main className="pt-20">
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};
