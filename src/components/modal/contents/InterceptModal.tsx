import { Modal } from '..';

interface Props {
  children: React.ReactNode;
}

function InterceptModal({ children }: Props) {
  return (
    <Modal.Root open={true}>
      <Modal.Content className="bg-zinc-50">{children}</Modal.Content>
    </Modal.Root>
  );
}

export default InterceptModal;
