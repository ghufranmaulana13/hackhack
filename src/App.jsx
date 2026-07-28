import React from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import CaseStudies from './components/CaseStudies.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Findings from './components/Findings.jsx';
import Pricing from './components/Pricing.jsx';
import CtaBanner from './components/CtaBanner.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div data-screen-label="hackhack.ai · home">
      <Nav />
      <Hero />
      <CaseStudies />
      <HowItWorks />
      <Findings />
      <Pricing />
      <CtaBanner />
      <Footer />
    </div>
  );
}
