export class CrearTarea{
    id: string;
    createdAt: Date;
    state: boolean;
    title: string;
    constructor(
        id: string,
        createdAt: Date,
        state: boolean,
        title: string,
    ){
        this.id = id;
        this.createdAt = createdAt;
        this.state = state;
        this.title = title;
    }
}