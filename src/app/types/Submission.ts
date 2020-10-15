export interface Submission {
  number: number;
  manuscript: string;
  about: string;
  agreement: string;
  anonymous: string;
  status: string;
}

export interface SubFile {
  submission: number;
  name: string;
}
