import { createSlice, createSelector } from '@reduxjs/toolkit';
import { tasksApiSlice } from './internal.ts';
import type { Task } from '../../types/index.ts';

export interface TasksState {
  tasks: Task[];
  filter: 'all' | 'pending' | 'completed';
  sortBy: 'date' | 'priority';
}

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
  sortBy: 'date',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Sync tasksApiSlice to tasksSlice
    builder.addMatcher(
      tasksApiSlice.endpoints.getTasks.matchFulfilled,
      (state, { payload }) => {
        state.tasks = payload.tasks;
      },
    );
  },
});

export const selectAllTasks = (state: TasksState) => state.tasks;

// Selectors with local filtering/sorting
export const selectFilteredAndSortedTasks = createSelector(
  [
    (state: TasksState) => state.tasks,
    (state: TasksState) => state.filter, 
    (state: TasksState) => state.sortBy, 
  ],
  (tasks, filter, sortBy) => {
    let result = [...tasks];
    
    // Apply filter
    if (filter === 'pending') {
      result = result.filter(t => t.status === 'pending');
    } else if (filter === 'completed') {
      result = result.filter(t => t.status === 'completed');
    }
    
    // Apply sort
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
    } 
    // else if (sortBy === 'priority') {
    //   const priorityOrder = { high: 0, medium: 1, low: 2 };
    //   result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    // }
    
    return result;
  },
);
