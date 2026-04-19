import { TasksList } from '../features/index.ts';

const TAB_CONFIG = {
  summary: {
    label: 'Summary',
    component: TasksList,
  },
  tasksList: {
    label: 'List',
    component: TasksList,
  }, 
  tasksDetails: {
    label: 'Details',
    component: TasksList,
  },
};

export const tabArray = Object.values(TAB_CONFIG);
