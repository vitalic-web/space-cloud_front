export interface IAuthState {
  token: string | null;
  username: string | null;
}

interface IFile {
  name: string;
  downloadLink: string;
}

interface IToDoItem {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  files: IFile[];
  comment: string;
}

export interface IToDoState {
  toDoList: IToDoItem[];
}
