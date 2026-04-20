import { useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useGetTasksQuery } from './features/index.ts';

import { tabArray } from './config/tabsConfig.ts';
import type { TabPanelProps, TabConfig } from './types/index.ts';
import './App.css';



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const options = [1, 2, 5];

export const App:React.FC = () => {
  const [value, setValue] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(10);
  // const { fetchTasks } = useTasks();
  // const { isError, isSuccess, isLoading } = useTasks(numberOfTasks);
  const { isLoading, isError, isSuccess } = useGetTasksQuery(numberOfTasks);
  // Using a query hook automatically fetches data and returns query values

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTab = (config: TabConfig) => {
    if (typeof config.component === 'function') {
      const Component = config.component;
      return <Component {...config.props} />;
    }
    return config.component;
  };

  if (isError) {
    return (
      <div className="container">
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
      <div id="center">
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
          <Box sx={{ width: '100%' }}>
            <h3>Select the Quantity of Tasks to Fetch:</h3>
            <select
              className="select"
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {tabArray.map((tab, index) => (
                  <Tab key={index} label={tab.label} {...a11yProps(index)} />
                ))}
              </Tabs>
            </Box>
            {tabArray.map((tab, index) => (
              <TabPanel key={tab.label + index} value={value} index={index}> 
                {renderTab(tab)} 
              </TabPanel>
            ))}
          </Box>
        </ErrorBoundary>
      </div>
    );
  }
};

