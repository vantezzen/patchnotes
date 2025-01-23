import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowToPlay from "@/components/landing/HowToPlay";

export default function Home() {
  return (
    <div className="text-black min-h-screen max-w-lg lg:max-w-none mx-auto">
      <Hero />
      <HowToPlay />
      <Footer />
    </div>
  );
}
