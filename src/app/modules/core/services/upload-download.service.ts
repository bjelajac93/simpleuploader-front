// Modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// Models
import { FileData } from '../../shared/models/file-data';

@Injectable({
  providedIn: 'root',
})
export class UploadDownloadService {
  private uploadFileSubject = new Subject<FileData>();

  get uploadedFile(): Subject<FileData> {
    return this.uploadFileSubject;
  }

  constructor(private http: HttpClient) {}

  public downloadFile(file: string): Observable<Blob> {
    return this.http.get(environment.API_ENDPOINT + `download?file=${file}`, {
      responseType: 'blob'
    })
  }

  uploadFile(file: Blob): Observable<FileData> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileData>(environment.API_ENDPOINT + 'upload', formData).pipe(
      tap((fileData: FileData) => {
        this.uploadFileSubject.next(fileData);
      })
    );
  }

  public getFiles(): Observable<FileData[]> {
    return this.http.get<FileData[]>(
      environment.API_ENDPOINT + 'files'
    );
  }
}
