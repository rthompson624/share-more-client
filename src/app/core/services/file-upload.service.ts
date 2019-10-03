import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { FileUploadResponse } from '../models/file-upload-response';

@Injectable({
  providedIn: CoreModule
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {
  }

  upload(file: File, userId: string): Observable<FileUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post<FileUploadResponse>(this.getUrl(userId), formData);
  }

  private getUrl(userId: string): string {
    return '/' + 'image-upload' + '/' + userId;
  }

}
