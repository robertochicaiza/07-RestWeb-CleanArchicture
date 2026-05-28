import { Request, Response } from "express";
import { todo } from "node:test";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";




export class TodoController {

    //* Dependicias pára acceder a la capa de servicios o datos, por ejemplo:
    
    constructor(
        private readonly todoRepository: TodoRepository
    ) {

    }

    public getTodo = async (req: Request, res: Response) => {
      
       const todos = await this.todoRepository.getAll();
       console.log('Todos:', todos);
        res.json(todos);

    }  

     public getTodoById = async(req: Request<{ id: string }>, res: Response) => {

            const id = +req.params.id;
            try{
                const todo = await this.todoRepository.findById(id); 
                res.json(todo);

            }
            catch(error){
                res.status(404).json({ message: `TODO with id ${id} not found` });
                return;
            }

            

    }  

    
    public createTodo = async(req: Request, res: Response) => {
        
        

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const newTodo = await this.todoRepository.create(createTodoDto!);


        res.status(201).json(newTodo);

    }

    public updateTodo = async (req: Request<{ id: string }>, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id });

        if (error) {
            return res.status(400).json({ message: error });
        }
        
        const todo = await this.todoRepository.updateById(updateTodoDto!);
        return res.json(todo);


    }

    public deleteTodo = async (req: Request<{ id: string }>, res: Response) => {

        const id = +req.params.id;  
        const deletedTodo = await this.todoRepository.deleteById(id);
        return res.json(deletedTodo);

    };
}
