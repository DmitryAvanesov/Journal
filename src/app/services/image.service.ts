import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Res } from '../types/Res';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private url = 'http://localhost:3000/api/image';

  uploadImage(image: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.httpClient.post<void>(`${this.url}/upload`, formData).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }

  downloadImage(): Observable<Res> {
    return this.httpClient.get<Res>(`${this.url}/download`).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }

  deleteImage(): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/delete`).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }
}
