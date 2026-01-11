export type Accent = "inkBlue" | "amber" | "forest" | "neutral";
export type Density = "tight" | "default" | "roomy";

export interface SiteMeta {
  title: string;
  description: string;
  domain: string;
  language: string;
  theme: {
    accent: Accent;
    maxWidth: string;
    density: Density;
  };
}

export interface CTA {
  label: string;
  href: string;
}

export interface Person {
  name_cn: string;
  name_en: string;
  handle: string;
  one_liner: string;
  belief: string;
  cta: CTA[];
}

export interface SimpleItem {
  title: string;
  summary?: string;
  description?: string;
  detail?: string;
  subtitle?: string;
  href?: string;
  status?: string;
  tags?: string[];
}

export interface SectionConfig {
  title: string;
}

export interface KeywordList {
  title: string;
  items: string[];
}

export interface Proof {
  title: string;
  items: string[];
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface Contact {
  title: string;
  email: string;
  links: ContactLink[];
  note?: string;
}

export interface Footer {
  text: string;
  analytics?: string;
}

export interface OGConfig {
  title: string;
  subtitle: string;
  bg?: string;
  style?: string;
}

export interface SectionList {
  title: string;
  items: SimpleItem[];
}

export interface Content {
  site: SiteMeta;
  person: Person;
  now: SectionList;
  projects: SectionConfig;
  writing: SectionConfig;
  proof: Proof;
  principles: KeywordList;
  toolkit: KeywordList;
  contact: Contact;
  footer: Footer;
  og: OGConfig;
}
