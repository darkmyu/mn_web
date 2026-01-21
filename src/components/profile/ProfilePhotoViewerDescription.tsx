import { useEffect, useRef, useState } from 'react';

interface Props {
  description: string | null;
}

function ProfilePhotoViewerDescription({ description }: Props) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, []);

  if (!description) return null;

  return (
    <div className="flex flex-col gap-8">
      <div ref={descriptionRef} className={`text-sm whitespace-pre-wrap ${!isExpanded ? 'line-clamp-3' : ''}`}>
        {description}
      </div>
      {(isOverflowing || isExpanded) && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex cursor-pointer items-center justify-center rounded-lg bg-zinc-50 py-2 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
        >
          {!isExpanded ? '더보기' : '간략히'}
        </button>
      )}
    </div>
  );
}

export default ProfilePhotoViewerDescription;
