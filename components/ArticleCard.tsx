import Link from 'next/link';
import Image from 'next/image';
import { Eye, Heart, MapPin } from 'lucide-react';
import type { Post } from '@/lib/data';
import TimeBlock from './TimeBlock';

export default function ArticleCard({ post }: { post: Post }) {
  return (
    <Link href={`/article/${post.slug}`} className="article-card">
      <div className="image-wrap">
        <Image src={post.image} alt={post.zhTitle} fill className="image" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="card-body">
        <div className="card-topline">
          <span className="tag">{post.tag}</span>
          <span className="muted-inline"><MapPin size={14} /> {post.location}</span>
        </div>
        <div>
          <h3 className="card-title">{post.zhTitle}</h3>
          <div className="card-subtitle">{post.enTitle}</div>
        </div>
        <TimeBlock firstLook={post.firstLook} secondLook={post.secondLook} days={post.days} />
        <p className="excerpt">{post.excerpt}</p>
        <div className="card-footer">
          <div>{post.author}</div>
          <div className="muted-inline">
            <span className="muted-inline"><Eye size={14} /> {post.views}</span>
            <span className="muted-inline"><Heart size={14} /> {post.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
