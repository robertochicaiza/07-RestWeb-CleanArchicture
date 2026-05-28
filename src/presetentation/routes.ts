import { Router } from "express";
import { TodosRoutes } from "./todos/routes";
import { TodoRoutes } from "./todo/router";

export class AppRoutes{

    static get routes():Router{

        const router = Router();

        //*Routes
        router.use('/api/todos', TodosRoutes.routes);
        router.use('/api/todo', TodoRoutes.routes);
        return router;


    }


}
