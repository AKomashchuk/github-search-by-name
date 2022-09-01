import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { fetchReposetoriesByName } from './app/api';
import { useAppDispatch } from './app/hooks';
import { AppDispatch, RootState } from './app/store';
import PaginationComponent from './components/Pagination';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { deleteCacheItem, setCacheItem } from './app/features/reposetoriesSlice';

function App() {
  const ref = useRef<any>();
  const dispatch: AppDispatch = useAppDispatch();
  const {
    items: reposetories,
    cache,
    status,
    message,
    name,
  } = useSelector((state: RootState) => state.reposetories);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const getDataForCache = useCallback((paginationPage: number) => {
    const currentDate = new Date();
    const key = `${query}-${paginationPage}`;
    const { items, date, totalCount } = cache[key] || {};
    const cachedTime = date ? date.getMinutes() - currentDate.getMinutes() : 0;

    return { key, items, cachedTime, totalCount, cachedName: cache[key]?.name };
  }, [cache, query]);

  const setPaginationPage = useCallback((paginationPage?: number) => {
    if (paginationPage) {
      setPage(paginationPage);
    } else {
      setPage(query !== name ? 1 : page);
    }
  }, [name, page, query]);

  const abortRequest = useCallback(() => {
    if (status === 'pending') {
      ref.current.abort();
    }
  }, [status])

  const onSubmit = useCallback((event: React.ChangeEvent<unknown>, value?: number) => {
    event.preventDefault();
    abortRequest();
    setPaginationPage(value);
    
    const { items, cachedTime, key, totalCount, cachedName } = getDataForCache(value || page);
    console.log(' items, cachedTime, key', items, cachedTime, key);
    

    if (items) {
      if (cachedTime && cachedTime >= 5) {
        dispatch(deleteCacheItem({ key }));
      } else {
        return dispatch(setCacheItem({ 
          items, 
          totalCount, 
          name: cachedName 
        }));
      }
    }

    const promise = dispatch(fetchReposetoriesByName({ 
      name: query, 
      page: value || page, 
      date: new Date() 
    }));
    ref.current = promise;
  }, [dispatch, query, page, getDataForCache, setPaginationPage, abortRequest]);

  return (
    <>
      <header className='header'>
        <h1 className='header__title'>Serch reposetories by name</h1>
        <form className='header__form form' onSubmit={onSubmit}>
          <Input
            className='form__input'
            type="text"
            placeholder='Search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className='form__button'>Done</button>
        </form>
      </header>
      <main className='main'>
        {status === 'pending' 
          ?  (<Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>)
          : (
            <>
              <ol start={(page - 1) * 30 + 1} className='main__list'>
                {reposetories.map(rep => (
                  <li className='main__item' key={rep.id}>{rep.name}</li>
                ))}
              </ol>
              {reposetories.length !== 0 && (
                <PaginationComponent page={page} onSubmit={onSubmit} />
              )}
            </>
          )}
      </main>
    </>
  );
}

export default App;
