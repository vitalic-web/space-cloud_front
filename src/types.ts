export interface IAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
}

export interface IFile {
  name: string;
  downloadLink: string;
  status: string;
  uid: number;
  _id: string;
}

export interface IToDoItem {
  title: string;
  description: string;
  completed: boolean;
  comment: string;
  files: IFile[];
  _id?: string;
}

export interface IToDoState {
  toDoList: {
    completed: IToDoItem[],
    notCompleted: IToDoItem[],
  };
  pageSize: number;
  totalCount: number;
  currentPage: number;
}
