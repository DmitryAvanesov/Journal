import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  getSubmissions(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/user-submissions`).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }
}
