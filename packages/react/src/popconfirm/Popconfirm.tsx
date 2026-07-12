import { useState, type ReactElement, type ReactNode } from 'react';
import { Close } from '@vertm/icons';
import { VertMPopover } from '../popover/Popover.js';
import { VertMButton } from '../button/Button.js';
import { VertMText } from '../VertMText.js';

export interface PopconfirmProps {
  title: ReactNode;
  description?: ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  children: ReactElement;
  disabled?: boolean;
}

export function VertMPopconfirm({
  title,
  description,
  onConfirm,
  onCancel,
  okText = 'ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠨ᠎ᠡ',
  cancelText = 'ᠦᠭᠡᠢ',
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
