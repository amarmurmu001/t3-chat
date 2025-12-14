
import Link from "next/link";
import { Bot, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#050505] text-zinc-400">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-primary/10 border border-primary/20">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-bold text-white">Qubot</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              The advanced AI interface for power users. 
              Open source, privacy-focused, and designed for speed.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-white">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/landing" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="https://github.com/amarmurmu001/t3-chat" className="hover:text-primary transition-colors">Open Source</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-white">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Qubot. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/amarmurmu001/t3-chat" target="_blank" className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-500 hover:text-white">
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
