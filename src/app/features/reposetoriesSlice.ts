import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../type/item";
import { fetchReposetoriesByName } from "../api";

interface ReposetoriesFromServer {
  items: Item[],
  totalCount: number,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ReposetoriesFromServer = {
  items: [],
  totalCount: 0,
  loading: 'idle',
}

export const reposeturiesSlice = createSlice({
  name: 'reposetories',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchReposetoriesByName.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalCount = action.payload.total_count
      state.loading = 'succeeded'
    })
    build.addCase(fetchReposetoriesByName.pending, (state) => {
      state.loading = 'pending'
    })
  }
})


export default reposeturiesSlice.reducer;
