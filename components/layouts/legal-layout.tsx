
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
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
                        {lastUpdated && (
                            <p className="text-muted-foreground text-sm uppercase tracking-widest">
                                Last Updated: {lastUpdated}
                            </p>
                        )}
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:marker:text-primary/50">
                        {children}
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
