import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { ConfigService } from '../services/config.service';

const IMAGE_SERVER: string = 'https://share-more.s3.us-east-2.amazonaws.com';
const IMAGE_PROFILE_BLANK: string = 'profile-blank.png';
const IMAGE_BLANK: string = 'image-blank.png';

@Injectable({
  providedIn: CoreModule
})
export class MediaService {

  constructor(
    private sanitizer: DomSanitizer,
    private configService: ConfigService
  ) {
  }

  getImageUrl(userId: string, imageFileName: string, type?: string): Observable<SafeUrl> {
    if (!imageFileName) {
      let file: string;
      switch(type) {
        case 'profile':
          file = IMAGE_PROFILE_BLANK;
          break;
        default:
          file = IMAGE_BLANK;
      }
      return of(this.sanitizer.bypassSecurityTrustUrl('/assets/graphics/' + file));
    } else {
      return this.configService.getConfig().pipe(
        switchMap(config => {
          return of(this.sanitizer.bypassSecurityTrustUrl('https://' + config.awsBucket + '.s3.' + config.awsRegion + '.amazonaws.com' + '/' + config.environment + '/' + 'users' + '/' + userId + '/' + imageFileName));
        })
      );
    }
  }

}
