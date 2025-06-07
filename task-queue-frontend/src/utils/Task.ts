import type {Task } from "../pages/BoardSectionList";

export const getTasksByStatus = (tasks: Task[], status: string) => {
  return tasks.filter((task) => task.status === status);
};

export const getTaskById = (tasks: Task[], id: string) => {
  return tasks.find((task) => task.id === id);
};
