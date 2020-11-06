import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review, SubFile, Submission } from '../types/Submission';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3000/api/file';

  makeSubmission(
    manuscript: File,
    about: File,
    agreement: File,
    anonymous: File
  ): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('manuscript', manuscript);
    formData.append('about', about);
    formData.append('agreement', agreement);
    formData.append('anonymous', anonymous);

    return this.httpClient.post<void>(`${this.url}/submission`, formData).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }

  getSubmissions(): Observable<Submission[]> {
    return this.httpClient
      .get<Submission[]>(`${this.url}/user-submissions`)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  getSubmissionByNumber(number: string): Observable<Submission> {
    const params = new HttpParams().set('number', number);

    return this.httpClient
      .get<Submission>(`${this.url}/submission-by-number`, { params })
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  getSubmissionsForReview(): Observable<Submission[]> {
    return this.httpClient
      .get<Submission[]>(`${this.url}/reviewer-submissions`)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  getSubmissionsForEditing(): Observable<Submission[]> {
    return this.httpClient
      .get<Submission[]>(`${this.url}/editor-submissions`)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  getSubmissionsForPublishing(): Observable<Submission[]> {
    return this.httpClient
      .get<Submission[]>(`${this.url}/publisher-submissions`)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  downloadFile(subFile: SubFile): Observable<ArrayBuffer> {
    const params = new HttpParams()
      .set('submission', subFile.submission.toString())
      .set('name', subFile.name);

    return this.httpClient
      .get<ArrayBuffer>(`${this.url}/download`, {
        params,
      })
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  reviewSubmission(review: Review): Observable<Submission> {
    return this.httpClient
      .patch<Submission>(`${this.url}/review`, {
        ...review,
      })
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  scheduleSubmission(id: string, reverse: boolean): Observable<Submission> {
    return this.httpClient
      .patch<Submission>(`${this.url}/schedule`, {
        id,
        reverse,
      })
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }
}
