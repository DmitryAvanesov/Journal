import { HttpClient, HttpParams } from '@angular/common/http';
import { Text } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubFile, Submission } from '../types/Submission';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private httpClient: HttpClient, private router: Router) {}

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

  getSubmissionsForReview(): Observable<Submission[]> {
    return this.httpClient
      .get<Submission[]>(`${this.url}/reviewer-submissions`)
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
}
