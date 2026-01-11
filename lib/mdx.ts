import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getSlugs(type: "posts" | "work") {
    const dir = path.join(contentDirectory, type);
    if (!fs.existsSync(dir)) {
        return [];
    }
    return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export interface ContentItem {
    slug: string;
    title: string;
    date?: string;
    summary?: string;
    content: string;
    [key: string]: any;
}

export function getBySlug(type: "posts" | "work", slug: string): ContentItem {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(contentDirectory, type, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        content,
        ...data,
    } as ContentItem;
}

export function getAll(type: "posts" | "work"): ContentItem[] {
    const slugs = getSlugs(type);
    const items = slugs
        .map((slug) => getBySlug(type, slug))
        .sort((item1, item2) => (item1.date && item2.date ? (item1.date > item2.date ? -1 : 1) : 0));
    return items;
}
