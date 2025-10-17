import ModalClose from './ModalClose';
import ModalContent from './ModalContent';
import ModalRoot from './ModalRoot';
import ModalTrigger from './ModalTrigger';

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Close: ModalClose,
});
