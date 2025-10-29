import { configureStore } from "@reduxjs/toolkit";
import formReducer from './slices/formslice'

export const store = configureStore({
  reducer: {
    form: formReducer
  }
});
