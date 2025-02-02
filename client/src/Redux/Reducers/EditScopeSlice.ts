import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScopeFormValue {
  service: string;
  service_ar: string;
  details: string;
  details_ar: string;
  iconImg: string;
  mainImg: string;
  slug: string;
  slug_ar: string;
  published:string
}

interface EditScopeSliceType {
  navId: number;
  tabId: number;
  formValue: ScopeFormValue;
}

const initialState: EditScopeSliceType = {
  navId: 1,
  tabId: 1,
  formValue: {
    service: "",
    service_ar: "",
    details: "",
    details_ar: "",
    iconImg: "",
    mainImg: "",
    slug: "",
    slug_ar: "",
    published:""
  },
};

const EditScopeSlice = createSlice({
  name: "editScope",
  initialState,
  reducers: {
    setNavId: (state, action: PayloadAction<number>) => {
      state.navId = action.payload;
    },
    setTabId: (state, action: PayloadAction<number>) => {
      state.tabId = action.payload;
    },
    setFormValue: (state, action: PayloadAction<{ name: keyof ScopeFormValue; value: unknown }>) => {
      state.formValue = {
        ...state.formValue,
        [action.payload.name]: action.payload.value,
      };
    },
    resetForm: (state) => {
      state.formValue = initialState.formValue;
    },
  },
});

export const { setNavId, setTabId, setFormValue, resetForm } = EditScopeSlice.actions;
export default EditScopeSlice.reducer;
