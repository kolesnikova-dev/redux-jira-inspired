import type { JSX } from 'react';
import React, { useState } from 'react';
import { useGetTasksQuery } from '../internal.ts';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import type { Task } from '../../../types/index.ts';
import { ASSIGNEE_UNASSIGNED, STATUS_PENDING, REPORTER, PRIORITY_UNPRIORITIZED, UNRESOLVED } from '../../../config/taskConfig.ts';

import styles from './TasksList.module.css';

const options = [5, 10, 20, 30];

const CheckBox: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ 
  checked, 
  onChange, 
}) => {
  return (
    <Checkbox 
      checked={checked} 
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

const NONE = 'none';

const TasksTable = ({ tasks }: {tasks: Task[]}) => {
  const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>({});

  const handleCheckboxChange = (taskId: number, isChecked: boolean) => {
    setCheckedRows(prev => ({
      ...prev,
      [taskId]: isChecked,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tasks table">
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <CheckBox 
                  checked={checkedRows[task.id] || false}
                  onChange={(isChecked) => handleCheckboxChange(task.id, isChecked)}
                />
              </TableCell>
              <TableCell>{task.task}</TableCell>
              <TableCell>{ASSIGNEE_UNASSIGNED}</TableCell>
              <TableCell>{REPORTER}</TableCell>
              <TableCell>{PRIORITY_UNPRIORITIZED}</TableCell>
              <TableCell>{STATUS_PENDING}</TableCell>
              <TableCell>{UNRESOLVED}</TableCell>
              <TableCell>{new Date(task.createdDate).toDateString()}</TableCell>
              <TableCell>{NONE}</TableCell>
              <TableCell>{NONE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
        <TasksTable tasks={data.tasks} />
      </div>
    );
  }

  return null;
};
