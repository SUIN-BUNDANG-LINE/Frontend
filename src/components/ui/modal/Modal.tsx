/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
// Modal.tsx
import React, { ReactNode } from 'react';
import { FaX } from 'react-icons/fa6';
import styles from './Modal.module.css';

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, isOpen, onClose, children }: React.PropsWithChildren<Props>) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onMouseDown={onClose}>
      <div className={styles.modalContent} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.modalTop}>
          <h2>{title}</h2>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            <FaX />
          </button>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
