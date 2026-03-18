'use client';

import { LAPTOP_QUERY, useMediaQuery } from '@/hooks/useMediaQuery';
import { LucideX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Modal } from '.';
import ProfilePhotoCommentListClientSuspense from '../profile/ProfilePhotoCommentListClientSuspense';
import ProfilePhotoViewerClientSuspense from '../profile/ProfilePhotoViewerClientSuspense';
import ProfilePhotoViewerSheet from '../sheet/ProfilePhotoViewerSheet';

interface Props {
  username: string;
  id: number;
}

function ProfilePhotoViewerModal({ username, id }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const isLaptop = useMediaQuery(LAPTOP_QUERY);

  const handleOpenChange = () => {
    setIsOpen(false);
  };

  const handelOpenChangeComplete = () => {
    if (!isOpen) {
      router.back();
    }
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const fakeUrl = currentUrl.replace(`/profile/${username}`, `/@${username}`);

    window.history.replaceState(window.history.state, '', fakeUrl);
  }, [username]);

  if (isLaptop) {
    return (
      <ProfilePhotoViewerSheet
        isOpen={isOpen}
        username={username}
        id={id}
        onClose={handleOpenChange}
        onCloseEnd={handelOpenChangeComplete}
      />
    );
  }

  return (
    <Modal.Root open={isOpen} onOpenChange={handleOpenChange} onOpenChangeComplete={handelOpenChangeComplete}>
      <Modal.Popup>
        <div className="flex h-[90dvh] w-4xl flex-col">
          <header className="flex items-center justify-end px-4 py-3">
            <Modal.Close
              render={
                <button className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                  <LucideX className="h-5 w-5" />
                </button>
              }
            />
          </header>
          <section className="scrollbar-hide overflow-y-auto">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 py-16">
              <ProfilePhotoViewerClientSuspense username={username} id={id} />
              <ProfilePhotoCommentListClientSuspense id={id} />
            </div>
          </section>
        </div>
      </Modal.Popup>
    </Modal.Root>
  );
}

export default ProfilePhotoViewerModal;
