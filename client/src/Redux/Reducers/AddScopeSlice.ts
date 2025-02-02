import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScopeFormValue {
  service: string;
  service_ar: string;
  details: string;
  details_ar: string;
  iconImg: string | File;
  mainImg: string | File;
  published: boolean;
}

interface ScopeSliceState {
  navId: number;
  tabId: number;
  formValue: ScopeFormValue;
}

const initialState: ScopeSliceState = {
  navId: 1,
  tabId: 1,
  formValue: {
    service: "",
    service_ar: "",
    details: "",
    details_ar: "",
    iconImg: "",
    mainImg: "",
    published: false,
  },
};

const AddScopeSlice = createSlice({
  name: "scopes",
  initialState,
  reducers: {
    setNavId: (state, action: PayloadAction<number>) => {
      state.navId = action.payload;
    },
    setTabId: (state, action: PayloadAction<number>) => {
      state.tabId = action.payload;
    },
    setFormValue: (
      state,
      action: PayloadAction<{
        name: keyof ScopeFormValue;
        value: string | File | undefined;
      }>
    ) => {
      // Type assertion ensures TypeScript allows the assignment
      state.formValue[action.payload.name] = action.payload.value as never;
    },
    resetForm: (state) => {
      state.formValue = initialState.formValue;
    },
  },
});

export const { setNavId, setTabId, setFormValue, resetForm } =
  AddScopeSlice.actions;
export default AddScopeSlice.reducer;
