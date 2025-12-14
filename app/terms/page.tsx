
import { LegalLayout } from "@/components/layouts/legal-layout";

export const metadata = {
    title: 'Terms of Service - Qubot',
    description: 'Terms of Service for Qubot AI Chat Assistant',
};

export default function TermsOfService() {
    return (
        <LegalLayout title="Terms of Service" lastUpdated={new Date().toLocaleDateString()}>
            <section>
                <h2>1. The Basics</h2>
                <p>
                    Welcome to Qubot. By using our app, you agree to these terms. If you don't agree, please don't use the app.
                    Simple as that.
                </p>
            </section>

            <section>
                <h2>2. Acceptable Use</h2>
                <p>
                    Don't do anything illegal. Don't try to hack us. Don't use the AI to generate harmful content.
                    We reserve the right to suspend accounts that violate these common-sense rules.
                </p>
            </section>

            <section>
                <h2>3. Content Ownership</h2>
                <p>
                    You own your chats. Always have, always will.
                </p>
            </section>

            <section>
                <h2>4. Disclaimer</h2>
                <p>
                    Qubot is provided "as is". AI can make mistakes (hallucinations). Always verify important information.
                    We are not liable for any damages resulting from the use of this AI assistant.
                </p>
            </section>

            <section>
                <h2>5. Updates</h2>
                <p>
                    We may update these terms as the product evolves. We'll do our best to notify you of major changes.
                </p>
            </section>
        </LegalLayout>
    );
}
