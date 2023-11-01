import { Id } from "./utils";

export interface TodoSchema extends Id {
  title: string;
  description?: string;
  dueDate?: Date;
}

export interface createTodoDto extends Omit<TodoSchema, "id"> {}

export interface updateTodoDto extends Partial<createTodoDto> {}
