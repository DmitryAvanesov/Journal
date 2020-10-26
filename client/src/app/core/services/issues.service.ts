import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IssueReq, IssueRes } from '../types/Issue';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3000/api/issue';

  publishIssue(issue: IssueReq): Observable<IssueRes> {
    return this.httpClient.post<IssueRes>(`${this.url}/publish`, issue).pipe(
      tap((x) => {
        const formData: FormData = new FormData();
        formData.append('cover', issue.cover);
        const params = new HttpParams().set('id', x._id);

        this.httpClient
          .patch<void>(`${this.url}/cover`, formData, { params })
          .pipe(
            catchError((err) => {
              throw new Error(JSON.stringify(err));
            })
          )
          .subscribe();
      }),
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }

  getIssues(): Observable<IssueRes[]> {
    return this.httpClient.get<IssueRes[]>(`${this.url}/issues`).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }
}
