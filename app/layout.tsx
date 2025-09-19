// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import ClientLayout from '../components/ClientLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';

const notoSansThai = Noto_Sans_Thai({
  weight: ['400', '600', '700'],
  subsets: ['thai'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Netflix Clone 101',
  description: 'This My Project Netflix Clone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoSansThai.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
