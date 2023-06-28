import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TasksDataService from "../services/tasks.service";

const initialState = [];

export const createTasks = createAsyncThunk(
  "tasks",
  async ({ creationDate, description, active }) => {
    const res = await TasksDataService.create({ creationDate, description, active });
    return res.data;
  }
);

export const retrieveTasks = createAsyncThunk(
  "tasks",
  async () => {
    const res = await TasksDataService.getAll();
    return res.data;
  }
);

export const updateTasks = createAsyncThunk(
  "tasks",
  async ({ identifier, data }) => {
    const res = await TasksDataService.update(identifier, data);
    return res.data;
  }
);

export const deleteTasks = createAsyncThunk(
  "tasks",
  async ({ identifier }) => {
    await TasksDataService.delete(identifier);
    return { identifier };
  }
);

export const findTasksByTitle = createAsyncThunk(
  "tasks",
  async () => {
    const res = await TasksDataService.findByTitle();
    return res.data;
  }
);


const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: {
    [createTasks.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveTasks.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTasks.fulfilled]: (state, action) => {
      const index = state.findIndex(Tasks => Tasks.identifier === action.identifier.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteTasks.fulfilled]: (state, action) => {
      let index = state.findIndex(({ identifier }) => identifier === action.payload.identifier);
      state.splice(index, 1);
    },
    [findTasksByTitle.fulfilled]: (state, action) => {
      try{
        return [...action.payload];
      }catch{
        return true;
      }
    },
  },
});

const { reducer } = TasksSlice;
export default reducer;
