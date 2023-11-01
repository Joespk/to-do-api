import { TodoSchema, createTodoDto, updateTodoDto } from "../entrtity/todo";
import { v4 as uuid } from "uuid";

export class TodoRepository {
  constructor(private _store: TodoSchema[]) {}

  public getALLTodos(): TodoSchema[] {
    return { ...this._store };
  }

  public createTodo(todo: createTodoDto): TodoSchema {
    const id = uuid();
    const newTodoWithId = { ...todo, id };
    this._store.push(newTodoWithId);
    return newTodoWithId;
  }

  public editTodo(newtodo: updateTodoDto, id: string): TodoSchema {
    const targetIndex = this._store.findIndex((item) => item.id === id);
    //ถ้าเกิดstatusที่เป็นUnderfined ให้ทำการhandleมันด้วย
    if (targetIndex === -1) throw new Error("Not found");
    const oldTodo = this._store[targetIndex];
    //สำคัญสุด
    this._store[targetIndex] = {
      ...oldTodo,
      ...newtodo,
      title: newtodo.title ? newtodo.title : oldTodo.title,
      id: oldTodo.id,
    };
    //
    return this._store[targetIndex];
  }

  public deleteTodo(id: string): TodoSchema {
    const beingDeleted = this._store.find((todo) => todo.id === id);
    if (beingDeleted === undefined) throw new Error("Not found");
    this._store = this._store.filter((todo) => todo.id !== id);

    return beingDeleted;
  }
}
