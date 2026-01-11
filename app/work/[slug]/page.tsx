import { getBySlug, getSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Custom components including Image
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
    img: (props: any) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-lg my-8 w-full border border-border" {...props} alt={props.alt || "Project image"} />
    ),
    // We use standard img for MDX compatibility unless we write a custom plugin, or mapping
    // Actually, standard img works fine with next/image if we use the Image component explicitly in MDX, 
    // but for standard markdown ![alt](src), it renders <img>. We style it here.
    Image: (props: any) => <Image className="rounded-lg my-8 w-full border border-border" {...props} alt={props.alt || "Project image"} />,
};

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const works = getSlugs("work");
    return works.map((work) => ({
        slug: work.replace(/\.mdx$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const work = getBySlug("work", slug);
        if (!work) return;
        return {
            title: `${work.title} | Wei Wu`,
            description: work.summary,
        }
    } catch (e) {
        return;
    }
}

export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let work;

    try {
        work = getBySlug("work", slug);
    } catch (e) {
        notFound();
    }

    return (
        <main className="fade-in">
            <header className="mb-10">
                <Link href="/work" className="text-sm text-subtle hover:text-fg mb-8 block transition-colors">
                    ← All Work
                </Link>
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-fg mb-4 leading-tight">
                    {work.title}
                </h1>
                <div className="flex gap-4 text-sm font-mono text-subtle items-center">
                    <time>{work.date}</time>
                    {work.link && (
                        <>
                            <span>/</span>
                            <a href={work.link} target="_blank" className="hover:text-fg underline decoration-1 underline-offset-2">Visit Live ↗</a>
                        </>
                    )}
                </div>
            </header>

            <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:text-muted prose-p:leading-relaxed prose-a:font-normal">
                <MDXRemote source={work.content} components={components} />
            </article>

            <div className="mt-16 pt-8 border-t border-border">
                <Link href="/" className="font-serif hover:underline">Wei Wu</Link>
            </div>
        </main>
    );
}
