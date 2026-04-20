import type { JSX } from 'react';

import { useAppSelector } from '../../store/index.ts';
import { selectAllTasks } from '../../features/tasks/index.ts';

import { TasksTable } from './TasksTable.tsx';

import styles from './TasksList.module.css';

export const TasksList = (): JSX.Element | null => {
  const { tasks } = useAppSelector(selectAllTasks);
  return (
    <div className={styles.container}>
      <TasksTable tasks={tasks} />
    </div>
  );
};
