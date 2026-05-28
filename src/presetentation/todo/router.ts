import { todo } from 'node:test';
import { Router } from "express";
import { TodoController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepository } from '../../domain';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';


export class TodoRoutes{

    static get routes():Router{

        const router = Router();

        const datasource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);


        const todosController = new TodoController(todoRepository);

        //*Routes
        router.get('/', todosController.getTodo);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);

        return router;


    }


}
