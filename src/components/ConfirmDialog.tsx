import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" showCloseButton={false}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 text-red-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-base text-slate-800">
              {title}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
