import { configureStore } from "@reduxjs/toolkit";
import reposetoriesSlice from "./features/reposetoriesSlice";

export const store = configureStore({
  reducer: {
    reposetories: reposetoriesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
