import { PhotoCommentResponse } from '@/api/index.schemas';
import { formatDate } from '@/utils/formatters';
import { LucideReply } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  reply: PhotoCommentResponse;
}

function ProfilePhotoReplyItem({ reply }: Props) {
  return (
    <div className="mt-6 flex items-start gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-700">
      <Link href={`/@${reply.author.username}`} className="flex h-6 w-6 items-center justify-center">
        <Image
          className="h-6 w-6 rounded-full object-cover"
          src={reply.author.profileImage ?? ''}
          alt=""
          width={24}
          height={24}
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <Link href={`/@${reply.author.username}`} className="text-sm font-medium">
              {reply.author.nickname}
            </Link>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(reply.createdAt)}</span>
          </div>
        </div>
        <div className="text-sm whitespace-pre-wrap">
          {reply.mention && (
            <Link
              href={`/@${reply.mention.username}`}
              className="mr-1 font-medium text-emerald-500 dark:text-emerald-400"
            >
              {`@${reply.mention.nickname}`}
            </Link>
          )}
          {reply.content}
        </div>
        <div className="flex items-center gap-4 pt-3">
          <div className="flex cursor-pointer items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <span className="text-sm">답글 작성</span>
            <LucideReply className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePhotoReplyItem;
