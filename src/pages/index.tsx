import Welcome from '@/components/welcome';

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
