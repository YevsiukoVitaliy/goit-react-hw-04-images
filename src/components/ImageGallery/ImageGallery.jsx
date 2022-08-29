import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';

export default function ImageGallery({ gallery, showModal }) {
  return (
    <ul className={css.ImageGallery}>
      {gallery.map(item => (
        <ImageGalleryItem showModal={showModal} key={item.id} item={item} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  showModal: PropTypes.func.isRequired,
  gallery: PropTypes.array.isRequired,
};
