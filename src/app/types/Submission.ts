export interface Submission {
  id: string;
  number: number;
  manuscript?: string;
  about?: string;
  agreement?: string;
  anonymous: string;
  status: string;
}

export interface SubFile {
  submission: number;
  name: string;
}

export interface Review {
  id: string;
  status: string;
}
