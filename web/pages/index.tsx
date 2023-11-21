import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`p-12 px-36 ${inter.className}`}>
      <div className="text-xl text-blue-500 underline grid grid-cols-5 auto-rows-auto gap-2">
        {Array.from({ length: 50 }, (_, i) => i + 1).map(number => (
          <div
            key={number}
            className="mb-2 inline"
          >
            <Link href={`/items/${number}`}>Item {number}</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
