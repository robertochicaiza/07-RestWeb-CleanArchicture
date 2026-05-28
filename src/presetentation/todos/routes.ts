import { Router } from "express";
import { TodosController } from "./controller";


export class TodosRoutes{

    static get routes():Router{

        const router = Router();
        const todosController = new TodosController();

        //*Routes
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.get('/todootro', todosController.getTodoOtro);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);

        return router;


    }


}
