'use client';

import { Sheet } from '@/components/sheet';
import { LucideX } from 'lucide-react';
import ProfilePhotoCommentListClientSuspense from '../profile/ProfilePhotoCommentListClientSuspense';
import ProfilePhotoViewerClientSuspense from '../profile/ProfilePhotoViewerClientSuspense';

interface Props {
  isOpen: boolean;
  username: string;
  id: number;
  onClose: () => void;
  onCloseEnd: () => void;
}

function ProfilePhotoViewerSheet({ isOpen, username, id, onClose: handleClose, onCloseEnd: handleCloseEnd }: Props) {
  return (
    <Sheet.Root isOpen={isOpen} detent="full" onClose={handleClose} onCloseEnd={handleCloseEnd} disableDrag>
      <Sheet.Backdrop onTap={handleClose} />
      <Sheet.Container unstyled>
        <Sheet.Header>
          <header className="flex items-center justify-end px-4 py-3">
            <button
              onClick={handleClose}
              className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <LucideX className="h-5 w-5" />
            </button>
          </header>
        </Sheet.Header>
        <Sheet.Content>
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 pt-4 pb-16">
            <ProfilePhotoViewerClientSuspense username={username} id={id} />
            <ProfilePhotoCommentListClientSuspense id={id} />
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet.Root>
  );
}

export default ProfilePhotoViewerSheet;
