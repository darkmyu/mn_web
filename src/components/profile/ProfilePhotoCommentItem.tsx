import { PhotoCommentResponse } from '@/api/index.schemas';
import { formatDate, formatNumber } from '@/utils/formatters';
import { LucideChevronDown, LucideReply } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import ProfilePhotoReplyList from './ProfilePhotoReplyList';
import ProfilePhotoReplyListSkeleton from './ProfilePhotoReplyListSkeleton';

interface Props {
  comment: PhotoCommentResponse;
  photoId: number;
}

function ProfilePhotoCommentItem({ comment, photoId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-start gap-4 border-zinc-200 not-first:mt-6 not-first:border-t not-first:pt-6 dark:border-zinc-700">
      <Link href={`/@${comment.author.username}`} className="flex h-9 w-9 items-center justify-center">
        <Image
          className="h-9 w-9 rounded-full object-cover"
          src={comment.author.profileImage ?? ''}
          alt=""
          width={36}
          height={36}
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <Link href={`/@${comment.author.username}`} className="text-sm font-medium">
              {comment.author.nickname}
            </Link>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(comment.createdAt)}</span>
          </div>
        </div>
        <div className="text-sm whitespace-pre-wrap">{comment.content}</div>
        <div className="flex items-center gap-4 pt-3">
          <button className="flex cursor-pointer items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <span className="text-sm">답글 작성</span>
            <LucideReply className="h-3.5 w-3.5" />
          </button>
          {comment.replyCount > 0 && (
            <button
              className="flex cursor-pointer items-center gap-1 text-emerald-600 dark:text-emerald-500"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="text-sm font-medium">{`답글 ${formatNumber(comment.replyCount)}개`}</span>
              <LucideChevronDown className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {isExpanded && (
          <Suspense fallback={<ProfilePhotoReplyListSkeleton />}>
            <ProfilePhotoReplyList photoId={photoId} commentId={comment.id} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default ProfilePhotoCommentItem;
