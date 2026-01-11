import Link from "next/link";
import { getAll } from "@/lib/mdx";

export const metadata = {
    title: "Writing | Wei Wu",
    description: "Notes on systems, leverage, and craft.",
};

export default function PostsIndex() {
    const posts = getAll("posts");

    return (
        <main className="fade-in">
            <header className="mb-12">
                <Link href="/" className="font-serif font-semibold text-lg hover:text-subtle transition-colors">
                    ← Back
                </Link>
                <h1 className="mt-8 font-serif text-3xl font-medium">Writing</h1>
            </header>

            <div className="flex flex-col gap-8">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4 decoration-border group-hover:decoration-fg transition-all">
                                {post.title}
                            </h2>
                            <div className="flex items-center gap-3 text-sm text-subtle font-mono">
                                <time dateTime={post.date}>{post.date}</time>
                            </div>
                            <p className="text-muted mt-2 leading-relaxed max-w-prose">
                                {post.summary}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
