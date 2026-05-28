


import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetByIdTodoUseCase {

    execute(id: number): Promise<TodoEntity>;

}

export class GetByIdTodo implements GetByIdTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    execute(id: number): Promise<TodoEntity> {

        return this.repository.findById(id);

    }


}

