import { useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { TasksList } from './features/index.ts';
import './App.css';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabConfig {
  label: string;
  component: React.ReactNode | (() => React.ReactNode);
  props?: Record<string, string>;
}

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

const tabArray = Object.values(TAB_CONFIG);

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

export const App:React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderComponent = (config: TabConfig) => {
    if (typeof config.component === 'function') {
      const Component = config.component;
      return <Component {...config.props} />;
    }
    return config.component;
  };
  return (
    <div id="center">
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {tabArray.map((tab, index) => (
                <Tab key={index} label={tab.label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>
          {tabArray.map((tab, index) => (
            <TabPanel key={tab.label + index} value={value} index={index}> 
              {renderComponent(tab)} 
            </TabPanel>
          ))}
        </Box>
      </ErrorBoundary>
    </div>
  );
};

