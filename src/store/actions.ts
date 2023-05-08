import {createAsyncThunk} from '@reduxjs/toolkit';
import {ProjectProps} from "./types.ts";
import {searchRepositories} from '../API/api';


export const searchProjects = createAsyncThunk<ProjectProps[], string>(
    'search/searchProjects',
    async (searchTerm) => {
        return await searchRepositories(searchTerm);

    }
);
