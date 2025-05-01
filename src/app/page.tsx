import AuthCallbackHandler from "@/components/auth/auth-redirect";
import { Footer } from "@/components/footer";
import { FAQ } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/feature-section";
import { HeadSection } from "@/components/landing/head-section";
import { Navbar, RouteProps } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { Suspense } from "react";


const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export default function Home() {

  return (
    <>
      <Suspense>
        <AuthCallbackHandler />
      </Suspense>
      <Navbar routeList={routeList}/>
      <HeadSection />
      <FeaturesSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
