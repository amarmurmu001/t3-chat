import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to Qubot with your GitHub account to start chatting with AI assistants.",
    openGraph: {
        title: "Sign In to Qubot",
        description: "Access your AI chat assistant by signing in with GitHub.",
    },
};

export default function SignInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
