import css from './modal.module.css';
import React, { useEffect } from 'react';

const Modal = ({ show, gallery, id, showModal, escFunction }) => {
  useEffect(() => {
    document.addEventListener('keydown', escFunction);
    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);
  if (!show) {
    return null;
  }
  return (
    <div
      onClick={() => {
        showModal();
      }}
      onKeyDown={() => escFunction()}
      className={css.Overlay}
    >
      {gallery
        .filter(item => item.id === id)
        .map(item => (
          <div key={id} className={css.Modal}>
            <img id={item.id} src={item.largeImageURL} alt="" />
          </div>
        ))}
    </div>
  );
};

export default Modal;
