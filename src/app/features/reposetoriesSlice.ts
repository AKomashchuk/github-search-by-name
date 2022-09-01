import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../type/item";
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
  status: 'idle' | 'pending' | 'succeeded' | 'reject',
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
      state.name = action.payload.name
      state.totalCount = action.payload.totalCount
    }
  },
  extraReducers: (build) => {
    build.addCase(fetchReposetoriesByName.fulfilled, (state, action) => {
      const items = action.payload.items || []
      const date = action.payload.date || ''
      const totalCount = action.payload.total_count || 0

      state.items = items
      state.totalCount = totalCount
      state.status = 'succeeded'
      state.message = action.payload.message || ''
      state.name = action.payload.name
      state.cache = {
        ...state.cache,
        [`${action.payload.name}-${action.payload.page}`]: { items, date, totalCount, name: action.payload.name }
      }
    })
    build.addCase(fetchReposetoriesByName.pending, (state) => {
      state.status = 'pending'
      state.message = ''
    })
    build.addCase(fetchReposetoriesByName.rejected, (state, action) => {
      state.status = 'reject'
      state.message = action.error.message
      state.items = []
    })
  }
})

export const { deleteCacheItem, setCacheItem } = reposeturiesSlice.actions;
export default reposeturiesSlice.reducer;
