import React, { useEffect, useState } from 'react';
import css from './app.module.css';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import { imageAPI } from 'imageAPI/imageAPI';

export default function App() {
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [galleryLength, setGalleryLength] = useState(0);
  const [per_page] = useState(12);
  const [search, setSearch] = useState('');

  const showModal = e => {
    setShow(!show);
    setId(e);
  };

  const escFunction = event => {
    if (show && event.key === 'Escape') {
      setShow(!show);
    }
  };

  useEffect(() => {
    if (page !== 1) {
      try {
        imageAPI(search, page, per_page).then(({ hits }) => {
          setGallery(prev => [...prev, ...hits]);
          setIsLoader(false);
          setGalleryLength(prev => prev + per_page);
        });
      } catch (error) {
        setError(error.imageAPI);
        console.log('error', error);
      } finally {
        setIsLoader(true);
      }
    }
  }, [page, search, per_page]);

  const handleMore = () => {
    setPage(page + 1);
  };

  const handleSubmit = search => {
    setSearch(search);
    setPage(1);
    setGallery([]);
    setGalleryLength(0);

    if (search.trim() !== '') {
      try {
        imageAPI(search, 1, per_page).then(({ hits }) => {
          setGallery(hits);
          setIsLoader(false);
          setGalleryLength(prev => prev + per_page);
        });
      } catch (error) {
        setError(error.imageAPI);
        console.log('error', error);
      } finally {
        setIsLoader(true);
      }
    }
  };
  return (
    <div className={css.App}>
      {error && <div>Что-то пошло не так</div>}
      <Searchbar onHandleSubmit={handleSubmit} />
      <ImageGallery showModal={showModal} gallery={gallery} show={show} />

      {isLoader && <Loader />}
      {gallery.length > 0 && galleryLength === gallery.length && (
        <Button handleMore={handleMore} />
      )}

      {show && (
        <Modal
          showModal={showModal}
          gallery={gallery}
          id={id}
          show={show}
          setShow={setShow}
          escFunction={escFunction}
        />
      )}
    </div>
  );
}
