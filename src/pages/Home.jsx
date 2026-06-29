import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import IndustriesSection from '@/components/home/IndustriesSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import CTASection from '@/components/home/CTASection';
import BrandsBanner from '@/components/home/BrandsBanner';
import ClientsBanner from '@/components/home/ClientsBanner';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO title="T.M Engineering | Industrial Automation Specialists in South Africa" description="T.M Engineering — South Africa's trusted industrial automation specialists for 39 years. PLC & HMI programming, control panels, SCADA, labelling machines, liquid fillers and 24/7 breakdown support. Based in Randburg, Johannesburg." />
      <HeroSection />
      <BrandsBanner />
      <StatsSection />
      <ServicesPreview />
      <ClientsBanner />
      <FeaturedProjects />
    </>
  );
}