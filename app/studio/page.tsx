'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { LoaderCircle, LogOut } from 'lucide-react';
import TimeBlock from '@/components/TimeBlock';
import { dailyPhotos } from '@/lib/data';
import { getSupabaseBrowserClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function StudioPage() {
  const [selectedId, setSelectedId] = useState<number>(dailyPhotos[0].id);
  const [title, setTitle] = useState('给这张照片第二次生命');
  const [body, setBody] = useState('这张照片第一次活在按下快门的那一刻，第二次活在我愿意重新看它、重新理解它、并且愿意为它写一点什么的今天。');
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState('');

  const selectedPhoto = useMemo(() => dailyPhotos.find((item) => item.id === selectedId) ?? dailyPhotos[0], [selectedId]);

  useEffect(() => {
    let isMounted = true;
    const supabase = getSupabaseBrowserClient();

    async function loadSession() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (isMounted) {
          setUser(data.user ?? null);
        }
      } catch (err) {
        if (isMounted) {
          const text = err instanceof Error ? err.message : '读取登录状态失败。';
          setAuthError(text);
        }
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setCheckingAuth(false);
    });

    return () => {
      isMounted = false;
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
      <div className="container page-space centered-state">
        <div className="panel-card auth-state-card">
          <LoaderCircle size={20} className="spin" />
          <p className="panel-text compact">正在确认登录状态…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container page-space centered-state">
        <div className="panel-card auth-state-card">
          <div className="section-kicker">Studio</div>
          <h1 className="section-title">先登录，再开始写。</h1>
          <p className="panel-text">
            Studio 现在已经接上真实账号系统了。下一步只需要通过 Join 页面用邮箱 magic link 登录。
          </p>
          {authError ? <p className="auth-message error">{authError}</p> : null}
          <div className="button-row">
            <Link href="/join" className="button button-solid">Go to Join</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-space">
      <section className="studio-grid">
        <div className="panel-card">
          <div className="studio-topline">
            <div>
              <div className="section-kicker">Today’s 10 photos</div>
              <h1 className="section-title">Random first. “On this day” included.</h1>
            </div>
            <button className="mini-button" type="button" onClick={handleSignOut}>
              <LogOut size={14} /> Sign out
            </button>
          </div>
          <p className="panel-text compact">已登录：{user.email}</p>
          <p className="panel-text">
            MVP only needs two things: randomness, and a few photos from the same day in past years. No folders, no categories, no over-design.
          </p>
          <div className="thumb-grid">
            {dailyPhotos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedId(photo.id)}
                className={`thumb-card ${selectedId === photo.id ? 'thumb-card-selected' : ''}`}
              >
                <div className="thumb-image-wrap">
                  <Image src={photo.image} alt={photo.location} fill className="image" sizes="(max-width: 768px) 50vw, 25vw" />
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

        <div className="panel-card">
          <div className="write-grid">
            <div className="write-image-wrap">
              <Image src={selectedPhoto.image} alt={selectedPhoto.location} fill className="image" sizes="(max-width: 1024px) 100vw, 30vw" />
            </div>
            <div>
              <div className="section-kicker">Write your second look</div>
              <h2 className="section-title">让公开写作从一张旧照片开始</h2>
              <p className="panel-text">你不需要知道今天写什么。只要先选一张跳出来的照片就够了。</p>
              <TimeBlock firstLook={selectedPhoto.firstLook} secondLook="2026.03.16" days="2529" />
              <div className="form-stack">
                <input
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your second look"
                />
                <div className="button-row">
                  <button className="button button-solid" type="button">Publish</button>
                  <button className="button button-outline" type="button">Save draft</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
