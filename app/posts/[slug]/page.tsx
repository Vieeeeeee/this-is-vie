import { getBySlug, getSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define custom components to override default HTML elements
const components = {
    h1: (props: any) => <h1 className="text-3xl font-serif font-medium mt-12 mb-6 text-fg" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-serif font-medium mt-10 mb-5 text-fg" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-serif font-medium mt-8 mb-4 text-fg" {...props} />,
    p: (props: any) => <p className="text-lg leading-relaxed text-muted mb-6" {...props} />,
    a: (props: any) => <a className="underline decoration-1 underline-offset-4 decoration-subtle hover:decoration-fg transition-colors text-fg" {...props} />,
    ul: (props: any) => <ul className="list-disc pl-5 mb-6 space-y-2 text-muted" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-5 mb-6 space-y-2 text-muted" {...props} />,
    li: (props: any) => <li className="pl-1" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-2 border-border pl-4 italic text-subtle my-6" {...props} />
    ),
    code: (props: any) => <code className="bg-gray-100 dark:bg-gray-800 text-sm px-1.5 py-0.5 rounded font-mono text-fg" {...props} />,
    pre: (props: any) => <pre className="bg-gray-100 dark:bg-gray-900 overflow-x-auto p-4 rounded-lg my-6 text-sm" {...props} />,
    // eslint-disable-next-line @next/next/no-img-element
    img: (props: any) => <img className="rounded-lg my-8 w-full border border-border" {...props} alt={props.alt || "Article Image"} />,
};

type Props = {
    params: {
        slug: string;
    };
};

// Generates static paths for all posts
export async function generateStaticParams() {
    const posts = getSlugs("posts");
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const post = getBySlug("posts", slug);
        if (!post) return;
        return {
            title: `${post.title} | Wei Wu`,
            description: post.summary,
        }
    } catch (e) {
        return;
    }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post;

    try {
        post = getBySlug("posts", slug);
    } catch (e) {
        notFound();
    }

    return (
        <main className="fade-in">
            <header className="mb-10">
                <Link href="/posts" className="text-sm text-subtle hover:text-fg mb-8 block transition-colors">
                    ← All Posts
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-fg mb-4 leading-tight">
                    {post.title}
                </h1>
                <time dateTime={post.date} className="text-sm font-mono text-subtle">
                    {post.date}
                </time>
            </header>

            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:text-muted prose-p:leading-relaxed prose-a:font-normal prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:not-italic prose-blockquote:text-subtle">
                {/* @ts-expect-error Server Component */}
                <MDXRemote source={post.content} components={components} />
            </article>

            <div className="mt-16 pt-8 border-t border-border">
                <Link href="/" className="font-serif hover:underline">Wei Wu</Link>
            </div>
        </main>
    );
}
