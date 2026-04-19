export interface DummyJsonTask {
  id: number
  todo: string
  completed: boolean
}

export type TasksApiResponse = {
  todos: DummyJsonTask[]
  total: number
  skip: number
  limit: number
}

export interface Task {
  id: number,
  task: string,
  status: string,
  priority: string,
  createdDate: string,
  updated?: string,
  dueDate?: string,
  assignee: string,
  reporter: string,
  resolution: boolean,
}

export type TransformedTasksResponse = {
  tasks: Task[]
  total: number
  skip: number
  limit: number
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface TabConfig {
  label: string;
  component: React.ReactNode | (() => React.ReactNode);
  props?: Record<string, string>;
}
