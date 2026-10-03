import { useState, type ReactElement, type ReactNode } from 'react';
import { Close } from '@vertm/icons';
import { VertMPopover } from '../popover/Popover.js';
import { VertMButton } from '../button/Button.js';
import { VertMText } from '../VertMText.js';

export interface PopconfirmProps {
  /** 确认框标题 */
  title: ReactNode;
  /** 确认框描述 */
  description?: ReactNode;
  /** 点击确认的回调，可返回 Promise */
  onConfirm?: () => void | Promise<void>;
  /** 点击取消的回调 */
  onCancel?: () => void;
  /** 确认按钮文案 */
  okText?: string;
  /** 取消按钮文案 */
  cancelText?: string;
  /** 触发确认框的子元素 */
  children: ReactElement;
  /** 是否禁用 */
  disabled?: boolean;
}

export function VertMPopconfirm({
  title,
  description,
  onConfirm,
  onCancel,
  okText = 'ᠲᠣᠭᠲᠠᠭᠠᠬᠤ',
  cancelText = 'ᠪᠣᠯᠢᠬᠤ',
  children,
  disabled,
}: PopconfirmProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm?.();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel?.();
  };

  const content = (
    <div className="vertm-popconfirm vertm-split">
      <div className="vertm-split__start">
        <div className="vertm-split__title vertm-popconfirm__title">
          {typeof title === 'string' ? <VertMText as="span" text={title} /> : title}
        </div>
      </div>
      {description && (
        <div className="vertm-split__center vertm-popconfirm__desc">
          {typeof description === 'string' ? (
            <VertMText as="span" text={description} />
          ) : (
            description
          )}
        </div>
      )}
      <div className="vertm-split__end vertm-popconfirm__actions">
        <button
          type="button"
          className="vertm-popup-close vertm-popconfirm__close"
          aria-label="Close"
          onClick={handleCancel}
        >
          <Close size="small" vertical={false} />
        </button>
        <div className="vertm-popconfirm__buttons">
          <VertMButton size="small" onClick={handleCancel}>
            {cancelText}
          </VertMButton>
          <VertMButton type="primary" size="small" loading={loading} onClick={handleConfirm}>
            {okText}
          </VertMButton>
        </div>
      </div>
    </div>
  );

  return (
    <VertMPopover
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      content={content}
      closable={false}
      disabled={disabled}
    >
      {children}
    </VertMPopover>
  );
}
