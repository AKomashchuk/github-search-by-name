import { getSuggestedQuery } from '@testing-library/react';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');

  const onSubmit = (event: any) => {
    event.preventDefaut();
  }

  return (
    <header>
      <h1>Serch reposetories by name</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='"Search"' value={query} onChange={(event) => setQuery(event.target.value)}/>
        <button>Done</button>
      </form>
    </header>
  );
}

export default App;
