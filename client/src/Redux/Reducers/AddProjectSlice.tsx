import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddProjectSliceType {
  navId: number;
  tabId: number;
  formValue: {
    title: string;
    title_ar: string;
    category: string;
    location: string;
    description: string;
    description_ar: string;
    startDate: Date;
    endDate: Date;
    progress: number;
    images: string;
    published: boolean;
  };
}

type FormValueKeys = keyof AddProjectSliceType["formValue"];

interface FormValuePayload {
  name: FormValueKeys;
  value: string | number | boolean | Date;
}

const initialState: AddProjectSliceType = {
  navId: 1,
  tabId: 1,
  formValue: {
    title: "",
    title_ar: "",
    category: "",
    location: "",
    description: "",
    description_ar: "",
    startDate: new Date(),
    endDate: new Date(),
    progress: 0,
    images: "",
    published: false,
  },
};

const AddProjectSlice = createSlice({
  name: "addProject",
  initialState,
  reducers: {
    setNavId: (state, action: PayloadAction<number>) => {
      state.navId = action.payload;
    },
    setTabId: (state, action: PayloadAction<number>) => {
      state.tabId = action.payload;
    },
    setFormValue: (state, action: PayloadAction<FormValuePayload>) => {
      state.formValue[action.payload.name] = action.payload.value as never;
    },
    resetForm: (state) => {
      state.formValue = initialState.formValue; // Reset to initial form values
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.formValue.progress = action.payload; // Set the progress field
    },
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.formValue.startDate = action.payload; // Set the start date
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.formValue.endDate = action.payload; // Set the end date
    },
  },
});

export const {
  setNavId,
  setTabId,
  setFormValue,
  resetForm,
  setProgress,
  setStartDate,
  setEndDate,
} = AddProjectSlice.actions;

export default AddProjectSlice.reducer;
