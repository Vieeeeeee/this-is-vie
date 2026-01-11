import Link from "next/link";
import { getAll } from "@/lib/mdx";

export const metadata = {
    title: "Work | Wei Wu",
    description: "Case studies of systems and products.",
};

export default function WorkIndex() {
    const works = getAll("work");

    return (
        <main className="fade-in">
            <header className="mb-12">
                <Link href="/" className="font-serif font-semibold text-lg hover:text-subtle transition-colors">
                    ← Back
                </Link>
                <h1 className="mt-8 font-serif text-3xl font-medium">Selected Work</h1>
            </header>

            <div className="flex flex-col gap-12">
                {works.map((work) => (
                    <Link key={work.slug} href={`/work/${work.slug}`} className="group block">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-baseline justify-between">
                                <h2 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4 decoration-border group-hover:decoration-fg transition-all">
                                    {work.title}
                                </h2>
                                <span className="text-xs font-mono text-subtle uppercase tracking-wider">{work.status || "Shipped"}</span>
                            </div>
                            <p className="text-muted leading-relaxed max-w-prose">
                                {work.summary}
                            </p>
                            <div className="flex gap-2 mt-2">
                                {work.tags?.map((tag: string) => (
                                    <span key={tag} className="text-xs text-subtle border border-border px-1.5 py-0.5 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
