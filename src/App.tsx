import { ErrorBoundary } from 'react-error-boundary';

import { TasksList } from './features/index.ts';
import './App.css';

export const App:React.FC = () => {

  return (
    <div id="center">
      <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
        <TasksList />
      </ErrorBoundary>
    </div>
  );
};

