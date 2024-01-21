import type {INote} from "~/types";


export const useNotes = () => useState<INote[]>('notes', ()=>  []);

