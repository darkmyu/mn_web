import Header from '@/components/header/Header';

export default function HomePage() {
  return (
    <div className="grid grid-cols-[1fr_min(1280px,100%)_1fr]">
      <Header />
      <main className="col-2 my-16 flex flex-col gap-4"></main>
    </div>
  );
}
