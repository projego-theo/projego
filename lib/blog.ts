import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  contentHtml: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const contentDir = path.join(process.cwd(), 'content', 'blog');

// Converts gray-matter's date (string OR Date object) to a plain YYYY-MM-DD string
function normalizeDate(raw: unknown): string {
  if (!raw) return '';
  if (raw instanceof Date) return isNaN(raw.getTime()) ? '' : raw.toISOString().split('T')[0];
  const s = String(raw).trim();
  // already an ISO string from JSON serialization
  return s.includes('T') ? s.split('T')[0] : s;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    // Append T12:00:00 so the date is interpreted in local time, not UTC midnight
    const d = new Date(`${dateStr.split('T')[0]}T12:00:00`);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPostsMeta(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(contentDir, `${slug}.md`);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents.trimStart());
      return {
        slug,
        title: String(data.title ?? ''),
        date: normalizeDate(data.date),
        description: String(data.description ?? ''),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  // trimStart so gray-matter finds --- even if Claude prepended whitespace/newlines
  const { data, content } = matter(fileContents.trimStart());

  // Belt-and-suspenders: strip any residual frontmatter gray-matter may have missed
  const body = content.trimStart().startsWith('---')
    ? content.replace(/^---[\s\S]*?---\s*\n?/, '').trimStart()
    : content.trimStart();

  const contentHtml = DOMPurify.sanitize(await marked(body));

  return {
    slug,
    title: String(data.title ?? ''),
    date: normalizeDate(data.date),
    description: String(data.description ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    contentHtml,
  };
}
