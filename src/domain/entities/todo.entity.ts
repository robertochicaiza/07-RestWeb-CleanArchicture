
export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt: Date | null,
    ) {

    }

    get isCompleted(): boolean {
        return !!this.completedAt;
    }

    public static fromObject(obj: {[key: string]: any}): TodoEntity {

        const { id, text, completedAt } = obj;
        if (typeof id !== 'number') {
            throw new Error('Invalid id');
        }
        if (typeof text !== 'string') {
            throw new Error('Invalid text');
        }
        
        let newcompletedAt;
        if(completedAt){
            newcompletedAt = new Date(completedAt);
            if (isNaN(newcompletedAt.getTime())) {
                throw new Error('Invalid completedAt date');
            }
        }

        return new TodoEntity(id, text, completedAt);


    }

} 
