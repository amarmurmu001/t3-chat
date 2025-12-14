
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Bot, Zap, Shield, Code2, Cpu, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">

            {/* Background FX */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10 opacity-50"></div>
            </div>

            <SiteHeader />

            <main className="flex-1 z-10 pt-24">
                {/* Hero Section */}
                <section className="relative px-6 py-20 md:py-32 flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-400">
                        
                        <span className="tracking-wide">v1.0 is live with multiple llm models</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.9] text-white">
                        Chat with AI, <br />
                        <span className="text-zinc-500">minus the friction.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                        Access the world's best models in a unified, uncluttered workspace designed for focus and speed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 w-full justify-center pt-8">
                        <Link href="/sign-in" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base font-semibold rounded-full bg-primary text-black hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_-5px_var(--color-primary)]">
                                Start Chatting
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Hero Image */}
                    <div className="mt-24 w-full">
                        <div className="rounded-xl border border-white/10 bg-[#0F0F0F] p-2 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20 -z-10 group-hover:opacity-30 transition-opacity duration-1000"></div>
                            <div className="rounded-lg overflow-hidden bg-[#050505] aspect-[16/10] md:aspect-auto relative">
                                <Image
                                    src="/hero-dark.png"
                                    alt="Qubot Interface"
                                    width={2000}
                                    height={1200}
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Grid */}
                <section className="px-6 py-32 bg-[#050505]">
                    <div className="max-w-7xl mx-auto space-y-20">
                        <div className="md:grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built for <br /><span className="text-zinc-500">Speed & Precision.</span></h2>
                                <p className="text-xl text-zinc-400 leading-relaxed">
                                    Latency matters. Qubot is built on the edge, ensuring that your thoughts are captured instantly and answers arrive before you blink.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {[
                                        "Sub-50ms implementation latency",
                                        "Streaming support for all models",
                                        "Optimized for keyboard navigation"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Zap className="h-4 w-4 text-primary" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0 relative aspect-square md:aspect-[4/3] bg-zinc-900/10 rounded-3xl border border-white/5 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[80%] space-y-4">
                                    {/* Floating cards animation */}
                                    <div className="p-4 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-xl translate-y-4 group-hover:-translate-y-4 transition-transform duration-700 delay-100 flex items-center gap-4">
                                        <div className="p-2 rounded bg-green-500/10"><Cpu className="h-5 w-5 text-green-500" /></div>
                                        <div>
                                            <div className="h-2 w-20 bg-white/20 rounded"></div>
                                            <div className="h-2 w-12 bg-white/10 rounded mt-2"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-xl -translate-x-4 group-hover:translate-x-0 transition-transform duration-700 delay-200 flex items-center gap-4 ml-8">
                                        <div className="p-2 rounded bg-blue-500/10"><Code2 className="h-5 w-5 text-blue-500" /></div>
                                        <div>
                                            <div className="h-2 w-24 bg-white/20 rounded"></div>
                                            <div className="h-2 w-16 bg-white/10 rounded mt-2"></div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-xl translate-x-4 group-hover:translate-x-0 transition-transform duration-700 delay-300 flex items-center gap-4">
                                        <div className="p-2 rounded bg-purple-500/10"><Shield className="h-5 w-5 text-purple-500" /></div>
                                        <div>
                                            <div className="h-2 w-32 bg-white/20 rounded"></div>
                                            <div className="h-2 w-12 bg-white/10 rounded mt-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/5">
                            {[
                                { title: "Universal History", desc: "Never lose a conversation. Cross-device sync just works." },
                                { title: "Model Agnostic", desc: "Don't get locked in. Use the best model for the job, always." },
                                { title: "Privacy First", desc: "Your data is yours. We encrypt everything at rest." }
                            ].map((f, i) => (
                                <div key={i} className="space-y-3 p-6 rounded-2xl bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 transition-colors">
                                    <h3 className="text-xl font-bold">{f.title}</h3>
                                    <p className="text-zinc-500 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* FAQ Section */}
                <section className="px-6 py-24 bg-[#0A0A0A] border-t border-white/5">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>

                        <Accordion type="single" collapsible className="w-full">
                            {[
                                {
                                    q: "Is Qubot free?",
                                    a: "Yes! Qubot offers a generous free tier that gives you access to open-source models like Llama 3 and Mistral. We also offer premium plans for access to GPT-4 and Claude 3.5 Opus."
                                },
                                {
                                    q: "How does the multi-model feature work?",
                                    a: "You can switch between models instantly from the chat interface. Each conversation remembers which model you were using, so you can have a coding chat with Claude and a creative writing chat with GPT-4 simultaneously."
                                },
                                {
                                    q: "Is my data secure?",
                                    a: "Absolutely. We encrypt all data at rest and in transit. We strictly do not sell your data or use it to train our own models. Your privacy is our priority."
                                },
                                {
                                    q: "Can I use Qubot on my phone?",
                                    a: "Yes, Qubot is fully responsive and works great on mobile devices. You can also install it as a PWA (Progressive Web App) for a native-like experience."
                                }
                            ].map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                                    <AccordionTrigger className="text-lg hover:no-underline hover:text-primary transition-colors text-left">{faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-zinc-400 text-base leading-relaxed">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* Big CTA */}
                <section className="px-6 py-40 flex items-center justify-center bg-[#0A0A0A] relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-[150px] opacity-20 pointer-events-none"></div>
                    <div className="text-center space-y-8 relative z-10 max-w-3xl">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Start building with Qubot.</h2>
                        <p className="text-zinc-400 text-lg md:text-xl">Join the community of developers who have stopped fighting their tools.</p>
                        <Link href="/sign-in" className="inline-block pt-4">
                            <Button size="lg" className="h-16 px-12 text-lg rounded-full bg-white text-black hover:bg-zinc-200 font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                Get Started Free
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Schema.org Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Is Qubot free?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Yes! Qubot offers a generous free tier that gives you access to open-source models like Llama 3 and Mistral. We also offer premium plans for access to GPT-4 and Claude 3.5 Opus."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How does the multi-model feature work?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "You can switch between models instantly from the chat interface. Each conversation remembers which model you were using, so you can have a coding chat with Claude and a creative writing chat with GPT-4 simultaneously."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Is my data secure?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Absolutely. We encrypt all data at rest and in transit. We strictly do not sell your data or use it to train our own models. Your privacy is our priority."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Can I use Qubot on my phone?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Yes, Qubot is fully responsive and works great on mobile devices. You can also install it as a PWA (Progressive Web App) for a native-like experience."
                                    }
                                }
                            ]
                        })
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://qubot.online"
                            }]
                        })
                    }}
                />

            </main>

            <SiteFooter />
        </div>
    );
}
