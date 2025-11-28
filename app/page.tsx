import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import StrategicIntelligence from "@/components/StrategicIntelligence";
import GlobalReach from "@/components/GlobalReach";
import Advisory from "@/components/Advisory";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="w-full relative">
      <Preloader />
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
