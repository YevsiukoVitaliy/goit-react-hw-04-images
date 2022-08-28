import React, { useEffect, useState } from 'react';
import css from './app.module.css';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import { imageAPI } from 'imageAPI/imageAPI';

export default function App() {
  const [page, setpage] = useState(1);
  const [gallery, setgallery] = useState([]);
  const [isLoader, setisLoader] = useState(false);
  const [error, seterror] = useState(null);
  const [show, setshow] = useState(false);
  const [id, setid] = useState('');
  const [galleryLength, setgalleryLength] = useState(0);
  const [per_page] = useState(12);
  const [search, setsearch] = useState('');

  const showModal = e => {
    setshow(!show);
    setid(e);
  };

  const escFunction = event => {
    if (show && event.key === 'Escape') {
      setshow(!show);
    }
  };
  useEffect(() => {
    if (page !== 1) {
      try {
        imageAPI(search, page, per_page).then(({ hits }) => {
          setgallery(prev => [...prev, ...hits]);
          setisLoader(false);
          setgalleryLength(prev => prev + per_page);
        });
      } catch (error) {
        seterror(error.imageAPI);
        console.log('error', error);
      } finally {
        setisLoader(true);
      }
    }
  }, [page, search, per_page]);

  const handleMore = () => {
    setpage(page + 1);
  };

  const handleSubmit = search => {
    setsearch(search);
    setpage(1);
    setgallery([]);
    setgalleryLength(0);
    console.log(galleryLength);

    if (search.trim() !== '') {
      try {
        imageAPI(search, 1, per_page).then(({ hits }) => {
          setgallery([...hits]);
          setisLoader(false);
          setgalleryLength(prev => prev + per_page);
        });
      } catch (error) {
        seterror(error.imageAPI);
        console.log('error', error);
      } finally {
        setisLoader(true);
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

      <Modal
        escFunction={escFunction}
        showModal={showModal}
        gallery={gallery}
        id={id}
        show={show}
      />
    </div>
  );
}
