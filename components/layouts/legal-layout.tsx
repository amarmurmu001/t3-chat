
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface LegalLayoutProps {
    children: React.ReactNode;
    title: string;
    lastUpdated?: string;
}

export function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary">
            <SiteHeader />
            <main className="flex-1 pt-32 pb-24 px-6 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="space-y-4 text-center">
                        <nav aria-label="Breadcrumb" className="flex justify-center">
                            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="/landing" className="hover:text-primary transition-colors">Home</a>
                                </li>
                                <li>/</li>
                                <li className="text-foreground font-medium" aria-current="page">{title}</li>
                            </ol>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
                        {lastUpdated && (
                            <p className="text-muted-foreground text-sm uppercase tracking-widest">
                                Last Updated: {lastUpdated}
                            </p>
                        )}
                    </div>

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://qubot.online"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": title,
                                        "item": `https://qubot.online/${title.toLowerCase().replace(/\s+/g, '-')}`
                                    }
                                ]
                            })
                        }}
                    />

                    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:marker:text-primary/50">
                        {children}
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
