import { useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { tabArray } from './config/tabsConfig.ts';
import type { TabPanelProps,TabConfig } from './types/index.ts';
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

export const App:React.FC = () => {
  const [value, setValue] = useState(0);

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
              {renderTab(tab)} 
            </TabPanel>
          ))}
        </Box>
      </ErrorBoundary>
    </div>
  );
};

