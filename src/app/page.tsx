import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import CartIcon from "@/components/ui/CartIcon";
import LeadCaptureModal from "@/components/ui/LeadCaptureModal";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Layer 0 — Animated background (fixed, full screen) */}
      <AnimatedBackground />

      {/* Lead capture popup — auto-shows after 1.5s */}
      <LeadCaptureModal />

      {/* Cart icon — fixed top-right */}
      <CartIcon />

      {/* Layer 1 — Content */}
      <div className="relative z-10">
        <Hero />
        <Footer />
      </div>
    </div>
  );
}
