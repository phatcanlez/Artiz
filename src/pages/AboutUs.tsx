import React from 'react';
import Header from '@/components/Header';
import AboutHero from '@/components/AboutHero';
import CompanyStory from '@/components/CompanyStory';
import MissionVision from '@/components/MissionVision';
import OurValues from '@/components/OurValues';
import WhyChooseUs from '@/components/WhyChooseUs';
import AboutCTA from '@/components/AboutCTA';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-[#000311]">
      <Header />
      <main>
        <AboutHero />
        <CompanyStory />
        <MissionVision />
        <OurValues />
        <WhyChooseUs />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;

