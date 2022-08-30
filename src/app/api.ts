import { createAsyncThunk } from '@reduxjs/toolkit';
const API_URL = "https://api.github.com/search/repositories?";

export type Data = {
  name: string,
  page: number,
}

export const fetchReposetoriesByName = createAsyncThunk(
  'reposetoriesApi',
  async (data: Data, thunkAPI) => {
    const response = await fetch(`${API_URL}q=${data.name}in:name&type=Repositories&sort=stars&page=${data.page}&per_page=30`,
    { signal: thunkAPI.signal })

    return await response.json()
  }
)