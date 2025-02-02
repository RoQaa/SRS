export interface IUser {
  _id?: string;
  fName: string;
  lName: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "viewer";
  comparePassword(candidatePassword: string): Promise<boolean>;
}
