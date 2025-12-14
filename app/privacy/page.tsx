
import { LegalLayout } from "@/components/layouts/legal-layout";

export const metadata = {
    title: 'Privacy Policy - Qubot',
    description: 'Privacy Policy for Qubot AI Chat Assistant',
};

export default function PrivacyPolicy() {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated={new Date().toLocaleDateString()}>
            <section>
                <h2>Introduction</h2>
                <p>
                    At Qubot, we believe privacy is a fundamental right. This policy outlines exactly what we collect,
                    why we collect it, and how we protect it. We are open source, so you can verify our claims by checking our code.
                </p>
            </section>

            <section>
                <h2>Data Collection</h2>
                <p>We collect only what is strictly necessary to provide our service:</p>
                <ul>
                    <li><strong>Identity:</strong> We use GitHub OAuth. We only store your public email and profile picture.</li>
                    <li><strong>Conversations:</strong> Your chats are stored in our secure database to provide history across devices.</li>
                    <li><strong>Usage:</strong> Minimal anonymous analytics to help us improve performance.</li>
                </ul>
            </section>

            <section>
                <h2>Data Usage & Sharing</h2>
                <p>
                    We do not sell your data. Ever.
                </p>
                <p>
                    Your chats are sent to AI providers (like OpenAI or Anthropic) solely for the purpose of generating responses.
                    We do not allow these providers to train their models on your data sent via our API.
                </p>
            </section>

            <section>
                <h2>Security</h2>
                <p>
                    We use industry-standard encryption for data at rest and in transit. Our database is hosted on secure,
                    compliance-certified infrastructure.
                </p>
            </section>

            <section>
                <h2>Contact</h2>
                <p>
                    Questions? Reach out to us via GitHub issues.
                </p>
            </section>
        </LegalLayout>
    );
}
