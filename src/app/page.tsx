import RankingFilter from '@/components/ranking/RankingFilter';
import RankingGrid from '@/components/ranking/RankingGrid';

export default function HomePage() {
  return (
    <div className="grid grid-cols-[1fr_min(1280px,100%)_1fr]">
      <div className="col-2 my-14 flex flex-col gap-4">
        <RankingFilter />
        <RankingGrid />
      </div>
    </div>
  );
}
