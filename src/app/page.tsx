import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Hero from "@/components/sections/Hero";
import QuickAccess from "@/components/sections/QuickAccess";
import LiveContent from "@/components/sections/LiveContent";
import Presenters from "@/components/sections/Presenters";
import ContactHub from "@/components/sections/ContactHub";
import AdZone from "@/components/sections/AdZone";
import Footer from "@/components/sections/Footer";
import CartIcon from "@/components/ui/CartIcon";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Layer 0 — Animated background (fixed, full screen) */}
      <AnimatedBackground />

      {/* Cart icon — fixed top-right */}
      <CartIcon />

      {/* Layer 1 — Content */}
      <div className="relative z-10">
        <Hero />
        <QuickAccess />
        <LiveContent />
        <Presenters />
        <ContactHub />
        <AdZone />
        <Footer />
      </div>
    </div>
  );
}
