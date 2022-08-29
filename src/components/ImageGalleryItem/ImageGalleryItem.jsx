import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css';

export default function ImageGalleryItem({ item, showModal }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={() => {
          showModal(item.id);
          console.log(item);
        }}
        className={css.ImageGalleryItemImage}
        src={item.webformatURL}
        alt=""
      />
    </li>
  );
}

ImageGalleryItem.propTpes = {
  showModal: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
