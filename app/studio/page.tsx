'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoaderCircle, LogOut, Cloud, HardDrive, Upload, Check } from 'lucide-react';
import TimeBlock from '@/components/TimeBlock';
import { dailyPhotos, sourceOptions } from '@/lib/data';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import { SOURCE_CONFIRMED_KEY } from '@/lib/constants';
import type { User } from '@supabase/supabase-js';

const iconMap = {
  nas: HardDrive,
  drive: Cloud,
  upload: Upload,
};

function SourceSetupOverlay({ onDone }: { onDone: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function confirm() {
    if (selected.length === 0) return;
    localStorage.setItem(SOURCE_CONFIRMED_KEY, JSON.stringify(selected));
    onDone();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'color-mix(in srgb, var(--bg) 96%, transparent)',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div className="kicker" style={{ marginBottom: 16 }}>首次设置</div>
        <h2 className="section-title" style={{ fontSize: 30 }}>选择你的照片来源</h2>
        <p className="panel-text" style={{ marginTop: 10, marginBottom: 28 }}>
          选好之后，每次打开 Second Look 就直接进入 Studio，不再重复询问。
        </p>
        <div className="source-grid">
          {sourceOptions.map((source) => {
            const Icon = iconMap[source.key as keyof typeof iconMap];
            const isSelected = selected.includes(source.key);
            return (
              <button
                key={source.key}
                className={`source-card ${isSelected ? 'source-card-selected' : ''}`}
                onClick={() => toggle(source.key)}
                type="button"
                style={{ width: '100%', textAlign: 'left' }}
              >
                <div className="source-icon"><Icon size={20} /></div>
                <div className="source-title">{source.title}</div>
                <p className="source-desc">{source.description}</p>
                {isSelected && <div style={{ marginTop: 10, color: 'var(--accent)' }}><Check size={14} /></div>}
              </button>
            );
          })}
        </div>
        <div className="button-row" style={{ marginTop: 28 }}>
          <button className="button button-solid" type="button" onClick={confirm} disabled={selected.length === 0}>
            确认，进入 Studio
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState('');
  const [showSourceSetup, setShowSourceSetup] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(dailyPhotos[0].id);
  const [title, setTitle] = useState('给这张照片第二次生命');
  const [body, setBody] = useState('这张照片第一次活在按下快门的那一刻，第二次活在我愿意重新看它、重新理解它、并且愿意为它写一点什么的今天。');

  const selectedPhoto = useMemo(
    () => dailyPhotos.find((p) => p.id === selectedId) ?? dailyPhotos[0],
    [selectedId]
  );

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseBrowserClient();

    async function init() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!mounted) return;
        const currentUser = data.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          const confirmed = localStorage.getItem(SOURCE_CONFIRMED_KEY);
          if (!confirmed) setShowSourceSetup(true);
        }
      } catch (err) {
        if (mounted) setAuthError(err instanceof Error ? err.message : '读取登录状态失败。');
      } finally {
        if (mounted) setCheckingAuth(false);
      }
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = '/join';
  }

  if (checkingAuth) {
    return (
      <div className="container centered-state">
        <div className="auth-state-card">
          <LoaderCircle size={18} className="spin" style={{ color: 'var(--soft)' }} />
          <p className="panel-text compact" style={{ marginTop: 12 }}>正在确认登录状态…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container centered-state">
        <div className="auth-state-card panel-card">
          <div className="kicker">Studio</div>
          <h1 className="section-title" style={{ fontSize: 26, marginTop: 10 }}>请先登录。</h1>
          <p className="panel-text" style={{ marginTop: 8 }}>
            Second Look 是私密档案，需要用管理员邮箱登录才能进入 Studio。
          </p>
          {authError && <p className="auth-message error">{authError}</p>}
          <div className="button-row" style={{ justifyContent: 'center', marginTop: 20 }}>
            <Link href="/join" className="button button-solid">去登录</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showSourceSetup && <SourceSetupOverlay onDone={() => setShowSourceSetup(false)} />}
      <div className="container page-space">
        <section className="studio-grid">
          <div className="panel-card" style={{ borderRadius: 0, border: 'none', borderRight: '1px solid var(--line)' }}>
            <div className="studio-topline">
              <div>
                <div className="kicker">Today's photos</div>
                <h1 className="section-title" style={{ fontSize: 22, marginTop: 6 }}>随机 + 那年今日</h1>
              </div>
              <button className="mini-button" type="button" onClick={handleSignOut}>
                <LogOut size={12} /> 退出
              </button>
            </div>
            <p className="panel-text" style={{ marginTop: 8 }}>{user.email}</p>
            <div className="thumb-grid">
              {dailyPhotos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedId(photo.id)}
                  className={`thumb-card ${selectedId === photo.id ? 'thumb-card-selected' : ''}`}
                >
                  <div className="thumb-image-wrap">
                    <Image src={photo.image} alt={photo.location} fill className="image" sizes="(max-width: 768px) 50vw, 20vw" />
                  </div>
                  <div className="thumb-body">
                    <div className="thumb-row">
                      <div className="thumb-title">{photo.location}</div>
                      <span className="tag">{photo.badge}</span>
                    </div>
                    <div className="thumb-date">First Look {photo.firstLook}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-card" style={{ borderRadius: 0, border: 'none' }}>
            <div className="write-grid">
              <div className="write-image-wrap">
                <Image src={selectedPhoto.image} alt={selectedPhoto.location} fill className="image" sizes="(max-width: 1024px) 100vw, 25vw" />
              </div>
              <div>
                <div className="kicker">Write your second look</div>
                <h2 className="section-title" style={{ fontSize: 22, marginTop: 8 }}>让一张旧照片，再活一次。</h2>
                <p className="panel-text">你不需要知道今天写什么。只要先选一张跳出来的照片就够了。</p>
                <TimeBlock
                  firstLook={selectedPhoto.firstLook}
                  secondLook={new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}
                  days="—"
                />
                <div className="form-stack">
                  <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="标题" />
                  <textarea className="textarea" value={body} onChange={(e) => setBody(e.target.value)} placeholder="写下你的第二次凝视…" />
                  <div className="button-row">
                    <button className="button button-solid" type="button">存入档案</button>
                    <button className="button button-outline" type="button">保存草稿</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
