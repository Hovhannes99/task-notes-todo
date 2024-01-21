

export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export interface INote {
    id: number;
    title: string;
    todos: ITodo[];
}