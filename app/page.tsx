import ArticleCard from '@/components/ArticleCard';
import { posts } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container page-space">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="section-kicker">Public Memory Magazine</div>
          <h1 className="hero-title">
            Forgotten photos, <span>looked at again.</span>
          </h1>
          <p className="hero-text">
            Second Look helps people begin public writing through photos that were never carefully selected for social media—only buried, forgotten, and waiting to return.
          </p>
          <div className="button-row">
            <a href="/join" className="button button-solid">Join Second Look</a>
            <a href="/studio" className="button button-outline">Start writing</a>
          </div>
          <div className="stats-row">
            <div><div className="stat-num">617</div><div className="stat-label">Stories</div></div>
            <div><div className="stat-num">16</div><div className="stat-label">Issues</div></div>
            <div><div className="stat-num">89</div><div className="stat-label">Writers</div></div>
          </div>
        </div>
        <div className="note-card">
          <div className="section-kicker">Editorial Note</div>
          <div className="note-title">A photo gets its second life when someone chooses to look again.</div>
          <p className="note-text">Not the best photo. Not the posted photo. Just the one that still has something to say.</p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <div className="section-kicker">Latest Issue</div>
            <h2 className="section-title">Leaf through the magazine</h2>
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
