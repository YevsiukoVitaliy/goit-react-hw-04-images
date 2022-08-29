import css from './modal.module.css';
import PropTypes from 'prop-types';
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
        console.log(id);
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

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  gallery: PropTypes.array.isRequired,
  id: PropTypes.number,
  showModal: PropTypes.func.isRequired,
  escFunction: PropTypes.func.isRequired,
};

export default Modal;
