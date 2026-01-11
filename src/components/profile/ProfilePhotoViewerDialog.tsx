'use client';

import { ScrollArea } from '@base-ui/react/scroll-area';
import { LucideMaximize2, LucideX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dialog } from '../dialog';
import ProfilePhotoViewer from './ProfilePhotoViewer';

interface Props {
  id: number;
  username: string;
}

function ProfilePhotoViewerDialog({ id, username }: Props) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) router.back();
  };

  const handleMaximizeClick = () => {
    window.location.reload();
  };

  return (
    <Dialog.Root open onOpenChange={handleOpenChange}>
      <Dialog.Popup className="flex h-full max-h-[95dvh] w-full max-w-4xl flex-col overflow-hidden">
        <header className="flex items-center justify-end gap-4 p-4">
          <button className="flex cursor-pointer items-center justify-center" onClick={handleMaximizeClick}>
            <LucideMaximize2 className="h-5 w-5" />
          </button>
          <Dialog.Close className="flex cursor-pointer items-center justify-center">
            <LucideX className="h-5 w-5" />
          </Dialog.Close>
        </header>
        <ScrollArea.Root className="h-full overflow-hidden">
          <ScrollArea.Viewport className="h-full">
            <ScrollArea.Content>
              <ProfilePhotoViewer id={id} username={username} />
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="pointer-events-none m-1 w-1.5 rounded-2xl opacity-0 transition-opacity duration-250 data-[hovering]:pointer-events-auto data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75">
            <ScrollArea.Thumb className="w-full rounded-2xl bg-zinc-400 dark:bg-zinc-600" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Dialog.Popup>
    </Dialog.Root>
  );
}

export default ProfilePhotoViewerDialog;
