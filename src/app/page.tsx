import { Footer } from "@/components/footer";
import { FAQ } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/feature-section";
import { HeadSection } from "@/components/landing/head-section";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeadSection />
      <FeaturesSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
