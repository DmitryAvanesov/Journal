import { Submission } from './Submission';

export interface IssueReq {
  number: number;
  year: number;
  submissions: string[];
}

export interface IssueRes {
  number: number;
  year: number;
  submissions: Submission[];
}
