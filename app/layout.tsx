import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Second Look',
  description: 'A magazine of rewritten photos.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand-block">
              <div className="brand-kicker">Second Look</div>
              <div className="brand-title">A magazine of rewritten photos</div>
            </Link>
            <nav className="nav">
              <Link href="/">Magazine</Link>
              <Link href="/studio">Write</Link>
              <Link href="/join">Join</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
