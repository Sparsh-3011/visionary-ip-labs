import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CredibilitySection from '../components/CredibilitySection';
import AchievementsSection from '../components/AchievementsSection';
import BenefitsSection from '../components/BenefitsSection';
import ServicesSection from '../components/ServicesSection';
import PrizesSection from '../components/PrizesSection';
import SponsorsSection from '../components/SponsorsSection';
import ApplicationForm from '../components/ApplicationForm';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="landing-page bg-slate-950 text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <CredibilitySection />
      <AchievementsSection />
      <BenefitsSection />
      <ServicesSection />
      <PrizesSection />
      <SponsorsSection />
      <ApplicationForm />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
