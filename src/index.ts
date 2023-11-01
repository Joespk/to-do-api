import express, { Request } from "express";
import { TodoRepository } from "./repository/todo";
import { TodoSchema, createTodoDto, updateTodoDto } from "./entrtity/todo";
import { ErrorReason } from "./entrtity/utils";

const app = express();
const initialStore: TodoSchema[] = [];
const todoRepo = new TodoRepository(initialStore);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("It's work!").end();
});

app.get("/todo", (req: Request<{}, TodoSchema[]>, res) => {
  res
    .header("Access-Control-Allow-Origin", "*")
    .json(todoRepo.getALLTodos())
    .end();
});

app.post("/todo", (req: Request<{}, TodoSchema, createTodoDto>, res) => {
  res.status(201).send(todoRepo.createTodo(req.body)).end();
});

app.patch(
  "/todo/:id",
  (
    req: Request<{ id: string }, TodoSchema | ErrorReason, updateTodoDto>,
    res
  ) => {
    try {
      const updateTodo = todoRepo.editTodo(req.body, req.params.id);
      res.status(201).json(updateTodo).end();
    } catch (error) {
      res.status(400).json({ reason: "Not found" }).end();
    }
  }
);

app.delete(
  "/todo/:id",
  (req: Request<{ id: string }, TodoSchema | ErrorReason>, res) => {
    try {
      const Deleted = todoRepo.deleteTodo(req.params.id);

      return res.status(200).json(Deleted).end();
    } catch (error) {
      if (error instanceof RangeError)
        return res.status(400).json({ reason: "Not found" }).end();
      return res
        .status(500)
        .json({ reason: `${error}` })
        .end();
    }
  }
);

app.listen(8001, () => {
  console.log(`App listening on port 8001`);
});
