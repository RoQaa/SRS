import { createSlice } from "@reduxjs/toolkit";

interface EditNewsSliceType {
  navId: number;
  tabId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValue: any;
}

const initialState: EditNewsSliceType = {
  navId: 1,
  tabId: 1,
  formValue: {
    title: "",
    title_ar: "",
    content: "",
    content_ar: "",
    thumbnail: "",
    images: [],
    published: true,
    date: new Date(),
    features: [],
    features_ar: [],
    author: "Ahmed",
  },
};

const editNewsSlice = createSlice({
  name: "editNews",
  initialState,
  reducers: {
    setNavId: (state, action) => {
      state.navId = action.payload;
    },
    setTabId: (state, action) => {
      state.tabId = action.payload;
    },
    setFormValue: (state, action) => {
      // Create a new object instead of mutating the existing one
      state.formValue = {
        ...state.formValue,
        [action.payload.name]: action.payload.value,
      };
    },
    resetForm(state) {
      state.formValue = initialState.formValue; // Reset to initial form values
    },
  },
});

export const { setFormValue, resetForm, setNavId, setTabId } =
  editNewsSlice.actions;

export default editNewsSlice.reducer;
