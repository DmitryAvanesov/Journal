import { Submission, SubTitle } from './Submission';

export interface IssueReq {
  number: number;
  year: number;
  submissions: SubTitle[];
}

export interface IssueRes {
  number: number;
  year: number;
  submissions: Submission[];
}
