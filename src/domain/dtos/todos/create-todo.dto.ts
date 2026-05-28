
export class CreateTodoDto {

    public constructor(
        public readonly text: string,
        public readonly completedAt: Date | null
    ){

    }

    static create( props: {[key:string]:any}): [string | undefined, CreateTodoDto | undefined] {

        const { text, completedAt } = props;

        if (!text || typeof text !== 'string') {
            return ['Text is required and must be a string', undefined];
        }

        if (completedAt && isNaN(Date.parse(completedAt))) {
            return ['CompletedAt must be a valid date string', undefined];
        }

        return [undefined, new CreateTodoDto(text, completedAt ? new Date(completedAt) : null)];
    }


}
