'use client';

import { useState } from 'react';
import { Mail, Cloud, HardDrive, Upload, LoaderCircle } from 'lucide-react';
import { getSupabaseBrowserClient, isAdminEmail } from '@/lib/supabase';
import { SOURCE_CONFIRMED_KEY } from '@/lib/constants';
import { sourceOptions } from '@/lib/data';

const iconMap = {
  nas: HardDrive,
  drive: Cloud,
  upload: Upload,
};

export default function JoinPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!isAdminEmail(email)) {
      setError('这个邮箱暂无访问权限。Second Look 目前是私密档案，不对外开放。');
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/studio`;
      const { error: supaErr } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (supaErr) throw supaErr;
      setMessage('Magic link 已发送到你的邮箱。请打开邮件继续登录。');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送失败，请稍后再试。');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="join-wrap">
        <div className="join-logo">Second Look · Private Archive</div>
        <h1 className="join-title">登录你的私人档案。</h1>
        <p className="join-sub">
          输入管理员邮箱，我们会给你发一个 magic link。
          首次登录后，你可以选择照片来源；之后每次打开直接进入 Studio。
        </p>

        <form className="auth-form" onSubmit={handleEmailSignIn}>
          <label className="auth-label" htmlFor="email">Email</label>
          <div className="auth-input-row">
            <Mail size={16} style={{ color: 'var(--soft)', flexShrink: 0 }} />
            <input
              id="email"
              type="email"
              className="auth-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="button-row" style={{ marginTop: 24 }}>
            <button
              className="button button-solid"
              type="submit"
              disabled={loading || !email}
            >
              {loading ? (
                <><LoaderCircle size={14} className="spin" /> Sending…</>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </div>
        </form>

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}

        <p className="auth-hint">
          如果你想更改或新增照片来源，登录后可在 Studio 右上角设置中修改。
        </p>

        <div className="source-step">
          <div className="kicker" style={{ marginBottom: 10 }}>图片来源</div>
          <p className="panel-text" style={{ marginTop: 0 }}>
            首次登录后，系统会引导你选择一次照片来源。之后打开网站直接进入 Studio，不再重复询问。
          </p>
          <div className="source-grid">
            {sourceOptions.map((source) => {
              const Icon = iconMap[source.key as keyof typeof iconMap];
              return (
                <div key={source.key} className="source-card">
                  <div className="source-icon"><Icon size={20} /></div>
                  <div className="source-title">{source.title}</div>
                  <p className="source-desc">{source.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
