import type { JSX } from 'react';
import { useState } from 'react';
import { useGetTasksQuery } from '../internal.ts';

import styles from './TasksList.module.css';

const options = [5, 10, 20, 30];

export const TasksList = (): JSX.Element | null => {
  const [numberOfTasks, setNumberOfTasks] = useState(10);
  // Using a query hook automatically fetches data and returns query values
  const { data, isError, isLoading, isSuccess } =
    useGetTasksQuery(numberOfTasks);

  if (isError) {
    return (
      <div className={styles.container}>
        <h1>There was an error</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isSuccess) {
    console.log(data);
    return (
      <div className={styles.container}>
        <h3>Select the Quantity of Tasks to Fetch:</h3>
        <select
          className={styles.select}
          value={numberOfTasks}
          onChange={(e) => {
            setNumberOfTasks(Number(e.target.value));
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {data.todos.map(({ todo, completed, id }) => (
          <blockquote key={id}>
            &ldquo;{todo}&rdquo;
            <footer>
              <cite>{completed}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    );
  }

  return null;
};
