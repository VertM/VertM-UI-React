import { VertMModal as ModalBase } from './Modal.js';
import { modal, useModal } from './ModalApi.js';

/** antd-style `Modal` with the imperative helpers attached. */
export const VertMModal = Object.assign(ModalBase, {
  confirm: modal.confirm,
  info: modal.info,
  success: modal.success,
  error: modal.error,
  warning: modal.warning,
  useModal,
});

export type { ModalProps } from './Modal.js';
export {
  modal,
  useModal,
  ModalHolder,
  type ModalAPI,
  type ModalFuncConfig,
  type ModalFuncReturn,
  type ConfirmType,
} from './ModalApi.js';
