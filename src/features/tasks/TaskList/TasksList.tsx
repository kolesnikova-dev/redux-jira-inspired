import type { JSX } from 'react';
import React, { useState, useEffect } from 'react';
import { useGetTasksQuery } from '../internal.ts';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import { capitalize } from '../../../utils/generalUtils.ts';

import type { Task } from '../../../types/index.ts';

import styles from './TasksList.module.css';
import { UNRESOLVED, RESOLVED } from '../../../config/taskConfig.ts';

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

const TasksTable = ({ tasks }: {tasks: Task[]}) => {
  const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>({});
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleCheckboxChange = (taskId: number, isChecked: boolean) => {
    setCheckedRows(prev => ({
      ...prev,
      [taskId]: isChecked,
    }));
  };

  const handleAllRowsCheckboxChange = () => {
    setIsAllChecked(prev => !prev);
  };

  useEffect(() => {
    if (isAllChecked) {
      tasks.map((task) => handleCheckboxChange(task.id, true));
    } else {
      tasks.map((task) => handleCheckboxChange(task.id, false));
    }
  }, [isAllChecked]);

  const NONE = capitalize('none');

  const rows = ['Work', 'Assignee', 'Reporter', 'Priority', 'Status', 'Resolution', 'Created', 'Updated', 'Due date'];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tasks table">
        <TableHead>
          <TableRow>
            <TableCell><CheckBox checked={isAllChecked} onChange={handleAllRowsCheckboxChange} /></TableCell>
            {rows.map((row, index) => (
              <TableCell key={row + index} align="right">{row}</TableCell>
            ))}
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
              <TableCell>{capitalize(task.assignee)}</TableCell>
              <TableCell>{task.reporter}</TableCell>
              <TableCell>{capitalize(task.priority)}</TableCell>
              <TableCell>{capitalize(task.status)}</TableCell>
              <TableCell>{task.resolution ? capitalize(UNRESOLVED) : capitalize(RESOLVED)}</TableCell>
              <TableCell>{new Date(task.createdDate).toDateString()}</TableCell>
              <TableCell>{task.updated ?? NONE}</TableCell>
              <TableCell>{task.dueDate ?? NONE}</TableCell>
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
