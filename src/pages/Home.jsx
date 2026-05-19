import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import IndustriesSection from '@/components/home/IndustriesSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import CTASection from '@/components/home/CTASection';
import ClientsBanner from '@/components/home/ClientsBanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientsBanner />
      <StatsSection />
      <ServicesPreview />
      <FeaturedProjects />
    </>
  );
}