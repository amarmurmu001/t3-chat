export function WelcomeMessage({ name }: { name?: string | null }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Hi, {name || 'there'}! <br />How can I help you today?</h2>
            <p className="max-w-[500px]">I'm here to assist you with coding, questions, or just to chat. Start by typing a message below.</p>
        </div>
    )
}
