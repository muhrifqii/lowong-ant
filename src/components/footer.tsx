import Link from "next/link";
import LogoIcon from "@/assets/icon.svg";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link
            rel="noreferrer noopener"
            href="/"
            className="flex"
          >
            <Image src={LogoIcon} alt="LowongAnt" height={120} width={120}/>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow US</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/muhrifqii"
              className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="https://x.com/muhrifqii"
              className="opacity-60 hover:opacity-100"
            >
              X
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://medium.com/@muhrifqii"
              className="opacity-60 hover:opacity-100"
            >
              Medium
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Platforms</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Web
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Mobile
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Desktop
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <Link
              rel="noreferrer noopener"
              href="/#features"
              className="opacity-60 hover:opacity-100"
            >
              Features
            </Link>
          </div>

          <div>
            <Link
              rel="noreferrer noopener"
              href="/#pricing"
              className="opacity-60 hover:opacity-100"
            >
              Pricing
            </Link>
          </div>

          <div>
            <Link
              rel="noreferrer noopener"
              href="/#faq"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2025 LowongAnt made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://muhrifqii.com"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Muhammad Rifqi Fatchurrahman
          </a>
        </h3>
      </section>
    </footer>
  );
};
