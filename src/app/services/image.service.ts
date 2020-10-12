import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  uploadImage(image: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.httpClient.post<void>('/upload', formData).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }
}
