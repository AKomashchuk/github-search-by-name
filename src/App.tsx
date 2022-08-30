import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Data, fetchReposetoriesByName } from './app/api';
import { useAppDispatch } from './app/hooks';
import { RootState } from './app/store';
import PaginationComponent from './components/Pagination';

function App() {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const reposetories = useSelector((state: RootState) => state.reposetories.items);
  const count = useSelector((state: RootState) => state.reposetories.totalCount);
  const params: Data = {
    name: query,
    page: 1,
  }

  console.log(count);

  const onSubmit = (event: React.ChangeEvent<unknown>) => {
    event.preventDefault();

    dispatch(fetchReposetoriesByName(params))
  }

  return (
    <>
      <header>
        <h1>Serch reposetories by name</h1>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder='"Search"' value={query} onChange={(event) => setQuery(event.target.value)}/>
          <button>Done</button>
        </form>
      </header>
      <main>
        <div>
          {reposetories.map(rep => (
            <p>{rep.name}</p>
          ))}
        </div>
        <PaginationComponent count={count} query={query} />
      </main>
    </>
  );
}

export default App;
