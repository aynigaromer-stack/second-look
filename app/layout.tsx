import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Second Look',
  description: 'A private album of rewritten photos.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand-block">
              <span className="brand-name">Second Look</span>
              <span className="brand-sub">Private Archive</span>
            </Link>
            <nav className="nav">
              <Link href="/">Archive</Link>
              <Link href="/studio">Studio</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
