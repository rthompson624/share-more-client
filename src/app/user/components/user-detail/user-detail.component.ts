import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserEditorDialogComponent } from '../user-editor-dialog/user-editor-dialog.component';
import { User } from '../../../core/models/user.model';
import { MediaService } from '../../../core/services/media.service';

@Component({
  selector: 'app-user-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() updateItem = new EventEmitter<User>();
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    public mediaService: MediaService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onEdit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '350px';
    dialogConfig.data = this.user;
    const dialogRef = this.dialog.open(UserEditorDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data) {
        this.updateItem.emit(<User>data);
      }
    });
  }

}
