
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Github, ArrowRight, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = ({ className }: { className?: string }) => (
    <>
      <Link
        href="/landing"
        className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", className)}
      >
        Home
      </Link>
      <Link
        href="/privacy"
        className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", className)}
      >
        Privacy
      </Link>
      <Link
        href="/terms"
        className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", className)}
      >
        Terms
      </Link>
      <Link
        href="https://github.com/amarmurmu001/t3-chat"
        target="_blank"
        className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1", className)}
      >
        GitHub <Github className="h-3 w-3" />
      </Link>
    </>
  );

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-black/50 backdrop-blur-xl border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/landing" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-colors">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Qubot</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="hidden md:block">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-in" className="hidden md:block">
            <Button size="sm" className="rounded-full px-5 font-semibold bg-white text-black hover:bg-white/90">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-zinc-400 hover:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-white/10 bg-[#0A0A0A] p-0">
              <SheetHeader className="p-6 border-b border-white/5 text-left">
                <SheetTitle className="flex items-center gap-2 text-white">
                  <div className="p-1.5 rounded bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  Qubot
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6 gap-6">
                <nav className="flex flex-col gap-6">
                   <Link href="/landing" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors">Home</Link>
                   <Link href="/privacy" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors">Privacy</Link>
                   <Link href="/terms" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors">Terms</Link>
                   <Link href="https://github.com/amarmurmu001/t3-chat" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center justify-between">
                      GitHub <Github className="h-5 w-5" />
                   </Link>
                </nav>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex flex-col gap-3">
                   <Link href="/sign-in" className="w-full">
                    <Button variant="outline" className="w-full h-12 border-white/10 bg-transparent text-white hover:bg-white/5">Sign In</Button>
                  </Link>
                  <Link href="/sign-in" className="w-full">
                    <Button className="w-full h-12 bg-primary text-black hover:bg-primary/90 font-bold">Get Started</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
