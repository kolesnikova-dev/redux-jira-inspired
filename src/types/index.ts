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
}

export type TransformedTasksResponse = {
  tasks: Task[]
  total: number
  skip: number
  limit: number
}
