export interface Submission {
  number: number;
  files: [string];
}

export interface SubFile {
  submission: number;
  name: string;
}
