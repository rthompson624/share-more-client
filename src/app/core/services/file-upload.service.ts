import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '../core.module';
import { FileUploadResponse } from '../models/file-upload-response';
import { NgxImageCompressService, DOC_ORIENTATION } from 'ngx-image-compress';
import { Observable, from, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export enum PicType {
  ITEM, PROFILE
}

const MAX_SIZE_KB = 50;

interface Compression {
  quality: number;
  image: string;
}

@Injectable({
  providedIn: CoreModule
})
export class FileUploadService {
  constructor(
    private httpClient: HttpClient,
    private imageCompressionService: NgxImageCompressService
  ) {
  }

  selectImageAndUpload(type: PicType, userId?: string): Observable<FileUploadResponse> {
    return from(this.imageCompressionService.uploadFile()).pipe(
      switchMap(file => {
        return this._compressToSize(file.image, file.orientation, MAX_SIZE_KB).pipe(
          switchMap(compressedImage => {
            const imageFile = new File([this._toBlob(compressedImage)], 'filename.jpg', { type: 'image/jpeg' });
            return this._upload(imageFile, type, userId);
          })
        );
      })
    );
  }

  private _compressToSize(image: string, orientation: DOC_ORIENTATION, maxSize: number): Observable<string> {
    const compressions$: Observable<Compression>[] = [];
    for (let quality = 5; quality <= 100; quality += 5) {
      const ratio = quality;
      compressions$.push(from(this.imageCompressionService.compressFile(image, orientation, ratio, quality)).pipe(
        map(compressedImage => ({ quality: quality, image: compressedImage }))
      ));
    }
    return forkJoin(compressions$).pipe(
      map(compressions => {
        compressions.sort((a, b) => b.quality - a.quality);
        let compression = compressions.find(compressionIterator => {
          const size = this._imageSize(compressionIterator.image);
          return size < maxSize;
        });
        if (!compression) {
          compression = compressions.pop();
        }
        return compression.image;
      })
    );
  }

  private _upload(file: File, type: PicType, userId?: string): Observable<FileUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post<FileUploadResponse>(this._getUrl(type, userId), formData);
  }

  private _getUrl(type: PicType, userId?: string): string {
    switch (type) {
      case PicType.ITEM:
        return '/' + 'item-image-upload';
      case PicType.PROFILE:
        return '/' + 'profile-image-upload' + '/' + userId;
    }
  }

  private _toBlob(imageData: string): Blob {
    const dataURI = imageData.split(',')[1];
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  private _imageSize(image: string): number {
    return this.imageCompressionService.byteCount(image) / 1024;
  }

}
