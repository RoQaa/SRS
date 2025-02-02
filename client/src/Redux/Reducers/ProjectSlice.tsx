import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "@/interfaces/Project.interface";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Define the state structure
interface ProjectsState {
  projectsData: IProject[];
  activeTab: string;
  currentProject: IProject | null;
  loading: boolean;
  dataLoaded: boolean;
  error: string | null | undefined;
}

// Selector to get projects sorted by latest
export const selectProjectsByLatest = (state: { project: ProjectsState }) => {
  return [...state.project.projectsData].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

const API_URI = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/projects`;

// Thunk to fetch all projects data
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URI, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data
          : "An unexpected error occurred."
      );
    }
  }
);

// Thunk to fetch a single project by ID
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectSlug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/${projectSlug}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error.response?.data
          : "An unexpected error occurred."
      );
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URI, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error?.response?.data
          : "Error Creating Project."
      );
    }
  }
);

// Thunk to delete a project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URI}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      dispatch(removeProject(projectId));
      return projectId;
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error?.response?.data
          : "An unexpected error occurred."
      );
    }
  }
);

// Thunk to update a project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (
    { updatedProject, slug }: { updatedProject: FormData; slug: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URI}/${slug}`, updatedProject, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      dispatch(setCurrentProject(response.data.doc));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof AxiosError
          ? error?.response?.data
          : "An unexpected error occurred."
      );
    }
  }
);

// Initial state
const initialState: ProjectsState = {
  projectsData: [],
  activeTab: "1",
  currentProject: null,
  loading: false,
  dataLoaded: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projectsData = state.projectsData.filter(
        (project: IProject) => project._id !== action.payload
      );
    },
    setCurrentProject: (state, action: PayloadAction<IProject>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projectsData = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load projects data.";
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.dataLoaded = false;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.dataLoaded = true;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.dataLoaded = true;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectsData.push(action.payload); // Update the project list
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projectsData.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.projectsData[index] = action.payload;
        }
        state.currentProject = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update project.";
      });
  },
});

// Selector to get the total number of projects.status
export const selectProjectStatusCounts = (state: {
  project: ProjectsState;
}) => {
  const statusCounts = { pending: 0, inProgress: 0, completed: 0 };

  if (state.project?.projectsData) {
    state.project.projectsData.forEach((project) => {
      if (project.status === "pending") statusCounts.pending += 1;
      else if (project.status === "in progress") statusCounts.inProgress += 1;
      else if (project.status === "completed") statusCounts.completed += 1;
    });
  }

  return statusCounts;
};

// Selector to get the total number of projects
export const selectTotalProjectsCount = (state: { project?: ProjectsState }) =>
  state.project?.projectsData?.length || 0;

// Selector to get project item by ID
export const selectProjectById = (
  state: { project: ProjectsState },
  projectId: string
) => {
  return (
    state.project.projectsData.find((project) => project._id === projectId) ||
    {}
  );
};

// Export actions and reducer
export const {
  setActiveTab,
  removeProject,
  setCurrentProject,
  clearCurrentProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;
