"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("./repository/todo");
const app = (0, express_1.default)();
const initialStore = [];
const todoRepo = new todo_1.TodoRepository(initialStore);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send("It's work!").end();
});
app.get("/todo", (req, res) => {
    res
        .header("Access-Control-Allow-Origin", "*")
        .json(todoRepo.getALLTodos())
        .end();
});
app.post("/todo", (req, res) => {
    res.status(201).send(todoRepo.createTodo(req.body)).end();
});
app.patch("/todo/:id", (req, res) => {
    try {
        const updateTodo = todoRepo.editTodo(req.body, req.params.id);
        res.status(201).json(updateTodo).end();
    }
    catch (error) {
        res.status(400).json({ reason: "Not found" }).end();
    }
});
app.delete("/todo/:id", (req, res) => {
    try {
        const Deleted = todoRepo.deleteTodo(req.params.id);
        return res.status(200).json(Deleted).end();
    }
    catch (error) {
        if (error instanceof RangeError)
            return res.status(400).json({ reason: "Not found" }).end();
    }
});
app.listen(8001, () => {
    console.log(`App listening on port 8001`);
});
