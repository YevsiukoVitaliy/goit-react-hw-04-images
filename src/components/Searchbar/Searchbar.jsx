import css from './searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onHandleSubmit }) => {
  const [search, setSearch] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onHandleSubmit(search);
  };
  const handleChange = evt => {
    setSearch(evt.target.value);
  };
  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButtonLabel}>
          <span className={css.SearchFormButton}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
        />
      </form>
    </header>
  );
};

export default Searchbar;
