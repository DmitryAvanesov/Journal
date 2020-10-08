export interface Submission {
  name: string;
  content: {
    type: string;
    data: Array<number>;
  };
}
