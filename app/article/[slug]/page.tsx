import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TimeBlock from '@/components/TimeBlock';
import { posts } from '@/lib/data';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <div className="container page-space">
      <section className="article-grid">
        <aside className="meta-card">
          <div className="kicker">{post.tag}</div>
          <h1 className="article-title">{post.zhTitle}</h1>
          <div className="article-subtitle">{post.enTitle}</div>
          <div className="article-author-row">
            <span>{post.author}</span>
            <span style={{ color: 'var(--soft)' }}>·</span>
            <span style={{ color: 'var(--soft)' }}>{post.location}</span>
          </div>
          <div className="divider" />
          <TimeBlock firstLook={post.firstLook} secondLook={post.secondLook} days={post.days} />
          <div className="divider" />
          <div className="article-nav-row">
            <Link href="/">← Archive</Link>
            <Link href="/studio">Studio →</Link>
          </div>
        </aside>

        <div className="article-content-wrap">
          <div className="hero-image-large">
            <Image src={post.image} alt={post.zhTitle} fill className="image" sizes="(max-width: 1024px) 100vw, 66vw" />
          </div>
          <article className="content-card">
            <div className="kicker">Second Look</div>
            <div className="article-body">
              {post.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
