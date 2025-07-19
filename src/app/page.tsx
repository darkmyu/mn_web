import HomeCta from '@/components/home/HomeCta';
import HomeRanking from '@/components/home/HomeRaking';

export default function HomePage() {
  return (
    <div className="grid grid-cols-[1fr_min(1280px,100%)_1fr]">
      <HomeCta />
      <HomeRanking />
    </div>
  );
}
