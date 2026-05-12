import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import IndustriesSection from '@/components/home/IndustriesSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import CTASection from '@/components/home/CTASection';
import BrandsBanner from '@/components/home/BrandsBanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <FeaturedProjects />
      <BrandsBanner />
      <CTASection />
    </>
  );
}