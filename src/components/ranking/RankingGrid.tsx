'use client';

import RankingCard from './RankingCard';

function RankingGrid() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 30 }, (_, index) => index).map((item) => (
        <RankingCard key={item} />
      ))}
    </div>
  );
}

export default RankingGrid;
