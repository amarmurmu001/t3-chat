import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // In a real app, you might fetch the chat title from the database
    // For now, we'll use a generic title
    return {
        title: "Chat",
        description: "Continue your conversation with Qubot AI assistant.",
        openGraph: {
            title: "Chat with Qubot",
            description: "AI-powered conversation assistant",
        },
    };
}

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
