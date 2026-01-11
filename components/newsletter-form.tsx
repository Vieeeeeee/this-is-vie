"use client";

import { useState } from "react";

export function NewsletterForm() {
    const [status, setStatus] = useState<"idle" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("success");
        // In a real app, this would POST to an API route
    };

    if (status === "success") {
        return (
            <p className="text-sm text-subtle fade-in">
                Thanks for subscribing. I'll keep it signal-only.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
            <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent border-b border-subtle py-1 text-sm text-fg placeholder:text-subtle focus:outline-none focus:border-fg transition-colors"
            />
            <button
                type="submit"
                className="text-sm font-medium text-subtle hover:text-fg transition-colors"
            >
                Subscribe
            </button>
        </form>
    );
}
