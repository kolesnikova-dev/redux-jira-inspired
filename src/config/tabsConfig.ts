import { TasksList, TasksSummary, TasksDetail } from '../components/index.ts';

const TAB_CONFIG = {
  tasksSummary: {
    label: 'Summary',
    component: TasksSummary,
  },
  tasksList: {
    label: 'List',
    component: TasksList,
  }, 
  tasksDetail: {
    label: 'Detail',
    component: TasksDetail,
  },
};

export const tabArray = Object.values(TAB_CONFIG);
