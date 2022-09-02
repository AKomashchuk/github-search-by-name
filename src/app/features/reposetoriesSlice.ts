import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../type/Item";
import { fetchReposetoriesByName } from "../api";


type Cache = {
  items: [],
  date: Date,
  totalCount: number,
  name: string,
}

interface ReposetoriesFromServer {
  items: Item[],
  totalCount: number,
  status: 'idle' | 'pending' | 'succeeded',
  message: string | undefined,
  cache: {
    [key: string]: Cache,
  },
  name: string,
}

const initialState: ReposetoriesFromServer = {
  items: [],
  totalCount: 0,
  status: 'idle',
  message: '',
  cache: {},
  name: '',
}

export const reposeturiesSlice = createSlice({
  name: 'reposetories',
  initialState,
  reducers: {
    deleteCacheItem(state, action) {
      delete state.cache[action.payload.key];
    },
    setCacheItem(state, action) {
      state.items = action.payload.items;
      state.name = action.payload.name;
      state.totalCount = action.payload.totalCount;
    }
  },
  extraReducers: (build) => {
    build.addCase(fetchReposetoriesByName.fulfilled, (state, action) => {
      const { items = [], date = '', total_count: totalCount = 0, message = '', name, page } = action.payload;

      state.items = items;
      state.totalCount = totalCount;
      state.status = 'succeeded';
      state.message = message;
      state.name = name;
      state.cache = {
        ...state.cache,
        [`${name}-${page}`]: { items, date, totalCount, name }
      };
    })
    build.addCase(fetchReposetoriesByName.pending, (state) => {
      state.status = 'pending';
      state.message = '';
    })
  }
})

export const { deleteCacheItem, setCacheItem } = reposeturiesSlice.actions;
export default reposeturiesSlice.reducer;
