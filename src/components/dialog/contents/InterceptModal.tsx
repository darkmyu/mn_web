import { Dialog } from '..';

interface Props {
  children: React.ReactNode;
}

function InterceptDialog({ children }: Props) {
  return (
    <Dialog.Root open={true}>
      <Dialog.Popup className="bg-zinc-50">{children}</Dialog.Popup>
    </Dialog.Root>
  );
}

export default InterceptDialog;
