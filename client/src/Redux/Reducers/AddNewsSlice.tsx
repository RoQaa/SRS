import { AddProductSliceType } from "@/Types/EcommerceType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AddProductSliceType = {
  navId: 1,
  tabId: 1,
  formValue: {
    title: "",
    title_ar: "",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa id ea quaerat distinctio saepe dolor esse quae inventore quasi magni reiciendis adipisci fuga illo quod assumenda omnis alias, delectus laborum Quae quod est neque consequatur id ea provident assumenda minus ipsam! Quos dolorem magnam dolores molestiae sequi, facilis voluptatibus impedit accusantium inventore, repellat quibusdam nemo tempora explicabo, praesentium quis modi",
    content_ar:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa id ea quaerat distinctio saepe dolor esse quae inventore quasi magni reiciendis adipisci fuga illo quod assumenda omnis alias, delectus laborum Quae quod est neque consequatur id ea provident assumenda minus ipsam! Quos dolorem magnam dolores molestiae sequi, facilis voluptatibus impedit accusantium inventore, repellat quibusdam nemo tempora explicabo, praesentium quis modi",
    thumbnail: "",
    images: "",
    published: true,
    // category: "",
    date: new Date(),
    features: [],
    features_ar: [],
  },
};

const AddNewsSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setNavId: (state, action) => {
      state.navId = action.payload;
    },
    setTabId: (state, action) => {
      state.tabId = action.payload;
    },
    setFormValue: (state, action) => {
      state.formValue[action.payload.name] = action.payload.value;
    },
    resetForm(state) {
      state.formValue = initialState.formValue; // Reset to initial form values
    },
  },
});
export const { setNavId, setFormValue, setTabId, resetForm } =
  AddNewsSlice.actions;

export default AddNewsSlice.reducer;
