import React, { useState } from 'react';
import { useRouter } from './lib/router';
import { CardRedirectPage } from './components/CardRedirectPage';
import { CardStatsPage } from './components/CardStatsPage';
import { AdminPanel } from './components/AdminPanel';
import { EntryAnimation } from './components/EntryAnimation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorks } from './components/HowItWorks';
import { WhyItWorks } from './components/WhyItWorks';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

export default function App() {
  const { route } = useRouter();

  const [showIntro, setShowIntro] = useState<boolean>(() => {
    // Only show intro if on home page and not seen in current session
    try {
      if (window.location.pathname.startsWith('/c/') || window.location.pathname.includes('painel') || window.location.pathname.includes('admin')) {
        return false;
      }
      return !sessionStorage.getItem('reviewy_intro_seen');
    } catch {
      return true;
    }
  });

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('reviewy_intro_seen', 'true');
    } catch {
      // safe fallback
    }
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem('reviewy_intro_seen');
    } catch {
      // safe fallback
    }
    setShowIntro(true);
  };

  // ROTA PERMANENTE — NÃO ALTERAR. QR Codes e NFC já impressos dependem dela.
  // ROTA 1A: Estatísticas do cartão (/c/:codigo/stats)
  if (route.type === 'card-stats') {
    return <CardStatsPage code={route.code} />;
  }

  // ROTA PERMANENTE — NÃO ALTERAR. QR Codes e NFC já impressos dependem dela.
  // ROTA 1B: Cartão NFC / QR Code público (/c/:codigo)
  if (route.type === 'card') {
    return <CardRedirectPage code={route.code} />;
  }

  // ROTA 2: Painel Administrativo Restrito (/painel-reviewy-adm)
  if (route.type === 'admin') {
    return <AdminPanel />;
  }

  // ROTA 3: Landing Page Principal (/)
  return (
    <div className="min-h-screen bg-[#0B1F45] text-white flex flex-col selection:bg-[#29D6F0]/30 selection:text-white">
      {/* Required Professional Entry Animation (Runs once per session on home, skippable) */}
      {showIntro && <EntryAnimation onComplete={handleIntroComplete} />}

      {/* Main Landing Page */}
      <div
        className={`flex flex-col flex-grow transition-opacity duration-500 ${
          showIntro ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <ProblemSection />
          <HowItWorks />
          <WhyItWorks />
          <PricingSection />
          <FaqSection />
          <FinalCta />
        </main>
        <Footer onReplayIntro={handleReplayIntro} />
      </div>
    </div>
  );
}
