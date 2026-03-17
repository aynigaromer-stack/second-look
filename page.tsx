import ArticleCard from '@/components/ArticleCard';
import { posts } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container page-space">

      {/* Hero */}
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="kicker">Private Memory Archive</div>
          <h1 className="hero-title">
            Forgotten photos,<br />
            <em>looked at again.</em>
          </h1>
          <p className="hero-text">
            这里收录的每一张照片，都曾被快门按下、被时间掩埋，
            然后在某一天被重新看见、重新书写。
            不是社交媒体，不是公开展示——只是两个人的私人纪念册。
          </p>
          <div className="button-row">
            <a href="/studio" className="button button-solid">进入 Studio</a>
          </div>
          <div className="stats-row">
            <div>
              <div className="stat-num">{posts.length}</div>
              <div className="stat-label">Stories</div>
            </div>
            <div>
              <div className="stat-num">2</div>
              <div className="stat-label">Authors</div>
            </div>
          </div>
        </div>
        <div className="note-card">
          <div className="kicker">关于这里</div>
          <div className="note-title">
            一张照片在被重新书写的那一刻，才真正活了第二次。
          </div>
          <p className="note-text">
            不是最好看的那张。不是发过朋友圈的那张。
            只是那张仍然有话可说的。
          </p>
        </div>
      </section>

      {/* Archive */}
      <section className="section-block">
        <div className="section-head">
          <div>
            <div className="kicker">All entries</div>
            <h2 className="section-title">Archive</h2>
          </div>
        </div>
        <div className="card-grid">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </section>

    </div>
  );
}
