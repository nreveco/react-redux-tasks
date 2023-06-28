import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasks';

const reducer = {
  tasks: tasksReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;