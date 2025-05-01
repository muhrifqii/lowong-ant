'use client'

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button, buttonVariants } from "../ui/button";
import { Menu } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ThemeModeToggle } from "../theme-mode-toggle";
import LogoIcon from "@/assets/icon.svg";
import Link from "next/link";
import Image from "next/image";

export type RouteProps = {
  href: string;
  label: string;
}

type NavbarProps = {
  routeList: RouteProps[],
};

export const Navbar = (props: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-background dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-2xl flex"
            >
              <Image src={LogoIcon} alt="LowongAnt" className="mr-2 w-10 h-10" />
              LowongAnt
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ThemeModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  {/* <span className="sr-only">Menu Icon</span> */}
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    LowongAnt
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {props.routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/muhrifqii/lowong-ant"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="w-5 h-5 text-foreground" />
                  </a>
                  <Link
                    href="/auth"
                    className={`w-[110px] ${buttonVariants({ variant: "default" })}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Recruiter Login
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {props.routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              rel="noreferrer noopener"
              href="https://github.com/muhrifqii/lowong-ant"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <GitHubLogoIcon className="w-5 h-5 text-foreground" />

            </a>

            <ThemeModeToggle />

            <Button variant="default">
              <Link
                href="/auth"
              >
                Recruiter Login
              </Link>
            </Button>

          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
