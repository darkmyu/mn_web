'use client';

import { useModalStore } from '@/stores/modal';

function ModalRenderer() {
  const { modals } = useModalStore();

  return (
    <>
      {modals.map((modal) => (
        <modal.component key={modal.key} {...modal.props} resolve={modal.resolve} reject={modal.reject} />
      ))}
    </>
  );
}

export default ModalRenderer;
