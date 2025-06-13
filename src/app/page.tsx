import HomeBanner from '@/components/home/HomeBanner';

export default function HomePage() {
  return (
    <div className={'grid grid-cols-[1fr_min(1280px,100%)_1fr]'}>
      <HomeBanner />
    </div>
  );
}
