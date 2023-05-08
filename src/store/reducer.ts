import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchProjects } from './actions';
import { ProjectProps } from "./types";

interface SearchState {
    projects: ProjectProps[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    projects: [],
    loading: false,
    error: null,
};


export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        editProject: (state, action: PayloadAction<ProjectProps>) => {
            const projectIndex = state.projects.findIndex(
                (project) => project.id === action.payload.id
            );
            if (projectIndex !== -1) {
                state.projects[projectIndex] = action.payload;
            }
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter(
                (project) => project.id.toString() !== action.payload
            );
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProjects.fulfilled, (state, action: PayloadAction<ProjectProps[]>) => {
                state.loading = false;
                state.error = null;
                state.projects = action.payload;
            })
            .addCase(searchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to search projects";
            });
    },
});

export const { editProject, deleteProject } = searchSlice.actions;
export default searchSlice.reducer;