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

  uploadProfilePic(file: File, userId: string): Observable<FileUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post<FileUploadResponse>(this.getProfilePicUploadUrl(userId), formData);
  }

  uploadItemPic(file: File): Observable<FileUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post<FileUploadResponse>(this.getItemPicUploadUrl(), formData);
  }

  private getProfilePicUploadUrl(userId: string): string {
    return '/' + 'profile-image-upload' + '/' + userId;
  }

  private getItemPicUploadUrl(): string {
    return '/' + 'item-image-upload';
  }

}
