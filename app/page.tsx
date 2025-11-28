import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import StrategicIntelligence from "@/components/StrategicIntelligence";
import GlobalReach from "@/components/GlobalReach";
import Advisory from "@/components/Advisory";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Collection />
      <StrategicIntelligence />
      <GlobalReach />
      <Advisory />
      <Footer />
    </main>
  );
}
