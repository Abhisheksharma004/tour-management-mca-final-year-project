import './globals.css';
import { Inter } from 'next/font/google';
import TransitionLayout from '@/components/TransitionLayout';
import { metadata } from './metadata';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 min-h-screen flex flex-col`}>
        <TransitionLayout>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </TransitionLayout>
      </body>
    </html>
  );
}
