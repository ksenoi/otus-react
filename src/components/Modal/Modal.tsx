import React, { Dispatch, ReactNode, memo, useState } from 'react';
import "./Modal.scss"

type Props = {
  title?: string;
  visible: boolean;
  setVisible: (visible: boolean) => void
  children: ReactNode;
}

export const Modal = ({ title, visible, setVisible, children }: Props) => {
  if (!visible) return; 
  
  return (
    <div className='details-modal-overlay'
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        setVisible(false);
      }}
    >
      {children}
    </div>
  );
};
