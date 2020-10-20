import { Res } from './Res';
import { Submission, SubTitle } from './Submission';

export interface IssueReq {
  number: number;
  year: number;
  submissions: SubTitle[];
}

export interface IssueRes {
  number: number;
  year: number;
  cover?: Res;
  submissions: Submission[];
}
