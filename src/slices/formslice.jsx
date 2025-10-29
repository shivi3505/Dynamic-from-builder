import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  elements: [],
  formData: {}
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setElements: (state, action) => {
      state.elements = action.payload;
    },
    addElement: (state, action) => {
      state.elements.push(action.payload);
    },
    updateElement: (state, action) => {
      state.elements = state.elements.map(el =>
        el.id === action.payload.id ? action.payload : el
      );
    },
    deleteElement: (state, action) => {
      state.elements = state.elements.filter(el => el.id !== action.payload);
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: state => {
      state.formData = {};
    }
  }
});

export const {
  setElements,
  addElement,
  updateElement,
  deleteElement,
  setFormData,
  resetFormData
} = formSlice.actions;

export default formSlice.reducer;
