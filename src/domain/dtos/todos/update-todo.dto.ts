export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ) {

    }

    get values(){
        const returnObj: {[key:string]: any} = {};
        
        if (this.text !== undefined) {
            returnObj.text = this.text;
        }
        if (this.completedAt !== undefined) {
            returnObj.completedAt = this.completedAt;
        }
        return returnObj;

    }

    static create(props: { [key: string]: any }): [string | undefined, UpdateTodoDto | undefined] {

        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;

        if (id === undefined || isNaN(Number(id))) {
            return ['ID is required and must be a number', undefined];
        }

        if (completedAt) {

            newCompletedAt = new Date(completedAt);

            if (isNaN(newCompletedAt.getTime())) {
                return ['CompletedAt must be a valid date string', undefined];
            }

        }




        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }


}
