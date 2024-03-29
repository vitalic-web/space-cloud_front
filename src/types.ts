export interface IAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
}

interface IFile {
  name: string;
  downloadLink: string;
}

export interface IToDoItem {
  title: string;
  description: string;
  completed: boolean;
  comment: string;
  files: IFile[];
}

export interface IToDoState {
  toDoList: IToDoItem[];
}
