import React from "react";
import Link from "next/link";
import content from "@/lib/content";
import { getAll } from "@/lib/mdx";
import { ThemeToggle } from "@/components/theme-toggle";
import { NewsletterForm } from "@/components/newsletter-form";

const isExternal = (href?: string) => href?.startsWith("http") ?? false;

const Section = ({ id, title, href, children }: { id: string; title: string; href?: string; children: React.ReactNode }) => (
  <section id={id} className="section fade-in">
    {href ? (
      <Link href={href} className="inline-block section-header hover:text-fg transition-colors mb-6">{title} ↗</Link>
    ) : (
      <span className="section-header">{title}</span>
    )}
    {children}
  </section>
);

export default function Home() {
  const posts = getAll("posts").slice(0, 3); // Latest 3 posts
  const works = getAll("work").slice(0, 3); // Latest 3 works

  return (
    <main className="fade-in">
      {/* ... existing header ... */}

      <header className="flex items-center justify-between mb-12">
        <Link href="/" className="font-serif font-medium text-xl tracking-tight hover:text-subtle transition-colors">
          {content.person.name_en}
        </Link>
        <ThemeToggle />
      </header>

      {/* Intro */}
      <section className="mb-16">
        <h1 className="font-serif text-2xl md:text-3xl leading-relaxed text-fg mb-6 max-w-[28ch]">
          {content.person.one_liner}
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-[38ch]">
          {content.person.belief}
        </p>

        <div className="flex gap-6 mt-8">
          {content.person.cta.map((cta) => (
            <Link key={cta.label} href={cta.href} className="text-sm border-b border-subtle pb-0.5 hover:border-fg hover:text-fg transition-colors">
              {cta.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Now */}
      <Section id="now" title={content.now.title}>
        <div className="flex flex-col gap-6">
          {content.now.items.map((item) => (
            <div key={item.title} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <Link
                href={item.href ?? "#"}
                className="font-medium hover:underline decoration-1 underline-offset-4 decoration-border hover:decoration-fg"
                target={isExternal(item.href) ? "_blank" : undefined}
              >
                {item.title}
              </Link>
              <span className="text-subtle text-sm hidden sm:inline">—</span>
              <span className="text-muted text-sm">{item.detail}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title={content.projects.title} href="/work">
        <div className="flex flex-col gap-10">
          {works.map((project) => (
            <div key={project.slug} className="group">
              <div className="flex items-baseline justify-between mb-1">
                <Link
                  href={`/work/${project.slug}`}
                  className="font-medium text-lg hover:underline decoration-1 underline-offset-4 decoration-border hover:decoration-fg"
                >
                  {project.title}
                </Link>
                <span className="text-xs font-mono text-subtle uppercase tracking-wider">{project.status}</span>
              </div>
              <p className="text-muted leading-relaxed max-w-prose">{project.summary}</p>
            </div>
          ))}
          {works.length === 0 && (
            <p className="text-sm text-subtle italic">Work in progress...</p>
          )}
        </div>
      </Section>

      {/* Writing */}
      <Section id="writing" title={content.writing.title} href="/posts">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block"
            >
              <h3 className="text-base font-medium group-hover:underline decoration-1 underline-offset-4 decoration-border group-hover:decoration-fg transition-all">
                {post.title}
              </h3>
              <p className="text-subtle text-sm mt-1">{post.summary}</p>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-subtle italic">Writing in progress...</p>
          )}
        </div>
      </Section>

      {/* Compact Proof & Principles */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <section>
          <span className="section-header">{content.proof.title}</span>
          <ul className="flex flex-col gap-3">
            {content.proof.items.map((item, i) => (
              <li key={i} className="text-sm text-muted pl-3 border-l text-balance border-border">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <span className="section-header">Principles / Toolkit</span>
          <div className="text-sm text-muted leading-loose">
            <span className="block mb-2 text-fg">Principles:</span>
            {content.principles.items.join(", ")}
            <span className="block mt-4 mb-2 text-fg">Toolkit:</span>
            {content.toolkit.items.join(", ")}
          </div>
        </section>
      </div>

      <Section id="newsletter" title="Newsletter">
        <p className="text-muted mb-4 max-w-[40ch]">
          Join 2,000+ readers. I share notes on building systems, design engineering, and solo leverage.
        </p>
        <NewsletterForm />
      </Section>

      {/* Contact */}
      <Section id="contact" title={content.contact.title}>
        <p className="text-muted mb-6">{content.contact.note}</p>
        <div className="flex flex-col gap-2 text-sm">
          <a href={`mailto:${content.contact.email}`} className="hover:text-fg transition-colors">
            Email: <span className="text-fg">{content.contact.email}</span>
          </a>
          {content.contact.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-fg transition-colors"
              target={isExternal(link.href) ? "_blank" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Section>

      <footer className="pt-12 mt-12 border-t border-border flex justify-between items-center text-xs text-subtle">
        <p>© {new Date().getFullYear()} {content.person.name_en}</p>
        <p>Minimalist Design</p>
      </footer>
    </main>
  );
}
