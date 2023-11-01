"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const uuid_1 = require("uuid");
class TodoRepository {
    constructor(_store) {
        this._store = _store;
    }
    getALLTodos() {
        return Object.assign({}, this._store);
    }
    createTodo(todo) {
        const id = (0, uuid_1.v4)();
        const newTodoWithId = Object.assign(Object.assign({}, todo), { id });
        this._store.push(newTodoWithId);
        return newTodoWithId;
    }
    editTodo(newtodo, id) {
        const targetIndex = this._store.findIndex((item) => item.id === id);
        //ถ้าเกิดstatusที่เป็นUnderfined ให้ทำการhandleมันด้วย
        if (targetIndex === -1)
            throw new Error("Not found");
        const oldTodo = this._store[targetIndex];
        //สำคัญสุด
        this._store[targetIndex] = Object.assign(Object.assign(Object.assign({}, oldTodo), newtodo), { title: newtodo.title ? newtodo.title : oldTodo.title, id: oldTodo.id });
        //
        return this._store[targetIndex];
    }
    deleteTodo(id) {
        const beingDeleted = this._store.find((todo) => todo.id === id);
        if (beingDeleted === undefined)
            throw new Error("Not found");
        this._store = this._store.filter((todo) => todo.id !== id);
        return beingDeleted;
    }
}
exports.TodoRepository = TodoRepository;
