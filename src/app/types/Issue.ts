import { Res } from './Res';
import { Submission, SubTitle } from './Submission';

export interface IssueReq {
  number: number;
  year: number;
  cover?: File;
  submissions: SubTitle[];
}

export interface IssueRes {
  _id?: string;
  number: number;
  year: number;
  cover?: Res;
  image?: string;
  submissions: Submission[];
}
