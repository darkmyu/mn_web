'use client';

import RankingCard from '@/components/ranking/RankingCard';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useRef } from 'react';

function HomeBanner() {
  const flickingRef = useRef<Flicking>(null);

  return (
    <div className={'col-2'}>
      <Flicking ref={flickingRef} align={'prev'} horizontal circular>
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <div key={i}>
            <RankingCard />
          </div>
        ))}
      </Flicking>
    </div>
  );
}

export default HomeBanner;
