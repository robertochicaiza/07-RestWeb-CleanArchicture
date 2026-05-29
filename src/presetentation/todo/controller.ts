import { Request, Response } from "express";
import { todo } from "node:test";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, GetAllTodo, GetByIdTodo, TodoRepository } from "../../domain";




export class TodoController {

    //* Dependicias pára acceder a la capa de servicios o datos, por ejemplo:
    
    constructor(
        private readonly todoRepository: TodoRepository
    ) {

    }

    public getTodo =  (req: Request, res: Response) => {
      
        // const todos = await this.todoRepository.getAll();
        // console.log('Todos:', todos);
        //     res.json(todos);
            
        new GetAllTodo(this.todoRepository)
        .execute()
        .then(todos => res.json(todos))
        .catch(error => {
            console.error('Error fetching todos:', error);
            res.status(500).json({ message: 'Internal server error' });
        });




    }  

     public getTodoById = (req: Request<{ id: string }>, res: Response) => {

            const id = +req.params.id;
            // try{
            //     const todo = await this.todoRepository.findById(id); 
            //     res.json(todo);

            // }
            // catch(error){
            //     res.status(404).json({ message: `TODO with id ${id} not found` });
            //     return;
            // }

            new GetByIdTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => {
                console.error(`Error fetching todo with id ${id}:`, error);
                res.status(404).json({ message: `TODO with id ${id} not found` });
            });

    }  

    
    public createTodo = (req: Request, res: Response) => {
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        // const newTodo = await this.todoRepository.create(createTodoDto!);
        // res.status(201).json(newTodo);
        
        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(newTodo => res.status(201).json(newTodo))
        .catch(error => {
            console.error('Error creating todo:', error);
            res.status(500).json({ message: 'Internal server error' });
        }   );
    }

    public updateTodo = async (req: Request<{ id: string }>, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id });

        if (error) {
            return res.status(400).json({ message: error });
        }

        try {
            const todo = await this.todoRepository.updateById(updateTodoDto!);
            return res.json(todo);
        } catch (error) {
            console.error(`Error updating todo with id ${id}:`, error);
            return res.status(404).json({ message: `TODO with id ${id} not found` });
        }

    }

    public deleteTodo = async (req: Request<{ id: string }>, res: Response) => {

        const id = +req.params.id;  
        try {
            const deletedTodo = await this.todoRepository.deleteById(id);
            return res.json(deletedTodo);
        } catch (error) {
            console.error(`Error deleting todo with id ${id}:`, error);
            return res.status(404).json({ message: `TODO with id ${id} not found` });
        }

    };
}
