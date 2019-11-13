import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { ConfigService } from '../services/config.service';

const IMAGE_PROFILE_BLANK = 'profile-blank.png';
const IMAGE_BLANK = 'image-blank.png';

@Injectable({
  providedIn: CoreModule
})
export class MediaService {

  constructor(
    private sanitizer: DomSanitizer,
    private configService: ConfigService
  ) {
  }

  getProfileImageUrl(userId: string, imageFileName: string): Observable<SafeUrl> {
    if (!imageFileName) {
      const file = IMAGE_PROFILE_BLANK;
      return of(this.sanitizer.bypassSecurityTrustUrl('/assets/graphics/' + file));
    } else {
      return this.configService.getConfig().pipe(
        switchMap(config => {
          const base = `https://${config.awsBucket}.s3.${config.awsRegion}.amazonaws.com`;
          const path = `/${config.environment}/users/${userId}/${imageFileName}`;
          const url = base + path;
          return of(this.sanitizer.bypassSecurityTrustUrl(url));
        })
      );
    }
  }

  getItemImageUrl(imageFileName: string): Observable<SafeUrl> {
    if (!imageFileName) {
      const file = IMAGE_BLANK;
      return of(this.sanitizer.bypassSecurityTrustUrl('/assets/graphics/' + file));
    } else {
      return this.configService.getConfig().pipe(
        switchMap(config => {
          const base = `https://${config.awsBucket}.s3.${config.awsRegion}.amazonaws.com`;
          const path = `/${config.environment}/items/${imageFileName}`;
          const url = base + path;
          return of(this.sanitizer.bypassSecurityTrustUrl(url));
        })
      );
    }
  }

}
