import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IssueReq, IssueRes } from '../types/Issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3000/api/issue';

  publishIssue(issue: IssueReq): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/publish`, issue).pipe(
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
