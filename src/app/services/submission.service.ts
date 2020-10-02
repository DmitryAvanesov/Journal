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
  constructor(private httpClient: HttpClient, private router: Router) {
    this.onInit();
  }

  private url = 'http://localhost:3000/api/file';
  uploader: FileUploader = new FileUploader({
    url: this.url,
    itemAlias: 'image',
  });

  onInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  }

  makeSubmission(file: File): Observable<File> {
    return this.httpClient.post<any>(`${this.url}/submission`, file).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }
}
