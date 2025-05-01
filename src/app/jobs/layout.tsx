import { Footer } from "@/components/footer";
import { Navbar } from "@/components/landing/navbar";

export default function JobLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar routeList={[
          { label: "Product", href: "/" },
          { label: "Job Search", href: "/jobs" },
        ]}
      />
      {children}
      <Footer />
    </>
  );
}
