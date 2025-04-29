import { Geist, Geist_Mono } from 'next/font/google';
import Welcome from '@/components/welcome';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <Welcome />
      </main>

      <footer className=''>
      </footer>
    </div>
  );
}
