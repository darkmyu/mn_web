import { useProfileControllerFollowersSuspenseInfinite } from '@/api/profile';
import { formatNumber } from '@/utils/formatters';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ProfileFollowerItem from './ProfileFollowerItem';
import ProfileFollowerItemSkeleton from './ProfileFollowerItemSkeleton';

interface Props {
  username: string;
}

function ProfileFollowerList({ username }: Props) {
  const { ref, inView } = useInView();

  const { data, hasNextPage, isFetched, isFetchingNextPage, fetchNextPage } =
    useProfileControllerFollowersSuspenseInfinite(
      username,
      {},
      {
        query: {
          getNextPageParam: (lastPage) => (lastPage.data.hasNextPage ? lastPage.data.cursor : undefined),
        },
      },
    );

  const total = data.pages[0]?.data.total ?? 0;
  const followers = data.pages.flatMap((page) => page.data.items);

  useEffect(() => {
    if (inView && hasNextPage && isFetched) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetched]);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-base font-medium lg:text-lg">{`${formatNumber(total)}명의 팔로워`}</p>
      <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-2">
        {followers.map((follower) => (
          <ProfileFollowerItem key={follower.id} follower={follower} />
        ))}
        {isFetchingNextPage && Array.from({ length: 4 }).map((_, index) => <ProfileFollowerItemSkeleton key={index} />)}
      </div>
      <div ref={ref} />
    </div>
  );
}

export default ProfileFollowerList;
