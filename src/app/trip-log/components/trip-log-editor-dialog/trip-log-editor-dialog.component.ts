import { Component, OnInit, Inject, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FileUploadService } from '../../../core/services/file-upload.service';
import { MediaService } from '../../../core/services/media.service'
import { TripLog } from '../../../core/models/trip-log.model';

@Component({
  selector: 'app-trip-log-editor-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trip-log-editor-dialog.component.html',
  styleUrls: ['./trip-log-editor-dialog.component.css']
})
export class TripLogEditorDialogComponent implements OnInit {
  log: TripLog;
  editMode: string;
  logForm: FormGroup;
  @ViewChild('fileControl') fileControl: ElementRef;
  isUploading: boolean = false;
  imgUrl: Observable<SafeUrl>;
  uploadError: string;

  constructor(
    private dialogRef: MatDialogRef<TripLogEditorDialogComponent>,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private uploadService: FileUploadService,
    public mediaService: MediaService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.log = data;
    this.editMode = this.log.id ? 'Edit' : 'New';
    if (this.log.imageUrl) {
      this.imgUrl = this.mediaService.getImageUrl(this.log.userId, this.log.imageUrl);
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  save() {
    this.log.description = this.logForm.controls['description'].value;
    this.log.logDate = this.logForm.controls['logDate'].value;
    this.dialogRef.close(this.log);
  }

  cancel() {
    this.dialogRef.close();
  }

  selectFile(): void {
    this.fileControl.nativeElement.click();
  }

  onFileSelected(): void {
    this.isUploading = true;
    this.uploadError = null;
    const files: FileList = this.fileControl.nativeElement.files;
    if (files.length > 0) {
      const file = files[0];
      this.uploadService.upload(file, this.log.userId).pipe(take(1)).subscribe(response => {
        this.log.imageUrl = response.file;
        this.imgUrl = this.mediaService.getImageUrl(this.log.userId, this.log.imageUrl);
        this.isUploading = false;
        this.changeDetectorRef.detectChanges();
      }, error => {
        this.isUploading = false;
        this.uploadError = this.formatError(error);
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  private buildForm(): void {
    this.logForm = this.fb.group({
      description: [this.log.description, [Validators.required]],
      logDate: [this.log.logDate, [Validators.required]]
    });
  }

  private formatError(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error && error.message) return error.message;
    if (error) return error;
  }

}
