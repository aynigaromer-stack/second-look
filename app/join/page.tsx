'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Cloud, HardDrive, LoaderCircle, Mail, Upload } from 'lucide-react';
import { sourceOptions } from '@/lib/data';
import { getSupabaseBrowserClient } from '@/lib/supabase';

const iconMap = {
  nas: HardDrive,
  drive: Cloud,
  upload: Upload
};

export default function JoinPage() {
  const searchParams = useSearchParams();
  const initialMessage = useMemo(() => {
    if (searchParams.get('sent') === '1') {
      return 'Magic link 已发送到你的邮箱。请打开邮件继续登录。';
    }
    return '';
  }, [searchParams]);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [error, setError] = useState('');

  async function handleEmailSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const supabase = getSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/studio`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo
        }
      });

      if (error) throw error;
      setMessage('Magic link 已发送到你的邮箱。请打开邮件继续登录。');
      setEmail('');
    } catch (err) {
      const text = err instanceof Error ? err.message : '发送登录邮件失败，请稍后再试。';
      setError(text);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/studio`
        }
      });
      if (error) throw error;
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Google 登录暂时不可用。';
      setError(text);
      setLoading(false);
    }
  }

  return (
    <div className="container page-space">
      <section className="join-grid">
        <div className="panel-card">
          <div className="section-kicker">Get Started</div>
          <h1 className="section-title large">Bring your photos in, then start writing.</h1>
          <p className="panel-text">
            用户注册后，只需要连接自己的照片来源，设置昵称和头像，就可以开始使用。Second Look 不关心你的文件夹怎么排列，只关心照片能不能跳出来。
          </p>
          <div className="step-stack">
            <div className="step-item">1. 注册 / 登录</div>
            <div className="step-item">2. 授权 NAS / 网盘 / Google Drive / 上传照片库</div>
            <div className="step-item">3. 设置昵称 + 头像</div>
            <div className="step-item">4. 生成今天的 10 张照片</div>
          </div>

          <form className="auth-card" onSubmit={handleEmailSignIn}>
            <label className="auth-label" htmlFor="email">Continue with Email</label>
            <div className="auth-input-row">
              <Mail size={18} />
              <input
                id="email"
                type="email"
                className="input auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="button-row">
              <button className="button button-solid" type="submit" disabled={loading || !email}>
                {loading ? <><LoaderCircle size={16} className="spin" /> Sending...</> : 'Send Magic Link'}
              </button>
              <button className="button button-outline" type="button" onClick={handleGoogleSignIn} disabled={loading}>
                Continue with Google
              </button>
            </div>
          </form>

          {message ? <p className="auth-message success">{message}</p> : null}
          {error ? <p className="auth-message error">{error}</p> : null}
          <p className="auth-hint">Second Look 不替你写。它只帮助你开始。</p>
        </div>
        <div className="source-grid">
          {sourceOptions.map((source) => {
            const Icon = iconMap[source.key as keyof typeof iconMap];
            return (
              <div key={source.key} className="panel-card source-card">
                <div className="icon-badge"><Icon size={18} /></div>
                <div className="source-title">{source.title}</div>
                <p className="panel-text compact">{source.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <div className="section-kicker">MVP Principles</div>
        <div className="source-grid four-up">
          <div className="panel-card source-card"><div className="source-title">Only deduplicate</div><p className="panel-text compact">只去重，不做截图过滤，不做复杂清理。</p></div>
          <div className="panel-card source-card"><div className="source-title">No photo categories</div><p className="panel-text compact">像 MP3 一样导入照片库，不关心文件夹结构。</p></div>
          <div className="panel-card source-card"><div className="source-title">Random + On This Day</div><p className="panel-text compact">MVP 只保留随机和那年今日。</p></div>
          <div className="panel-card source-card"><div className="source-title">Start writing fast</div><p className="panel-text compact">目标不是整理相册，而是尽快开始公开写作。</p></div>
        </div>
      </section>
    </div>
  );
}
