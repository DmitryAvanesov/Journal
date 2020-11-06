import { User } from './User';

export interface Submission {
  id: string;
  user: string;
  number: number;
  manuscript?: string;
  about?: string;
  agreement?: string;
  anonymous: string;
  status: string;
  title?: string;
  author?: User;
}

export interface SubAuthor {
  [id: string]: User;
}

export interface SubFile {
  submission: number;
  name: string;
}

export interface SubTitle {
  id: string;
  title: string;
}

export interface Review {
  id: string;
  status: string;
}
