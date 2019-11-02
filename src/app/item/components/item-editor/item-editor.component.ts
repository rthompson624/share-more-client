import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FileUploadService } from '../../../core/services/file-upload.service';
import { MediaService } from '../../../core/services/media.service'
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-item-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
  @Input() item: Item;
  @Output() itemSave = new EventEmitter<Item>();
  itemForm: FormGroup;
  @ViewChild('fileControl', { static: false }) fileControl: ElementRef;
  isUploading: boolean = false;
  imgUrl: Observable<SafeUrl>;
  uploadError: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private uploadService: FileUploadService,
    public mediaService: MediaService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildForm();
    if (this.item.picUrl) {
      this.imgUrl = this.mediaService.getItemImageUrl(this.item.picUrl);
    }
  }

  onSubmit(): void {
    this.item.name = this.itemForm.controls['name'].value;
    this.item.description = this.itemForm.controls['description'].value;
    this.itemSave.emit(this.item);
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
      this.uploadService.uploadItemPic(file).pipe(take(1)).subscribe(response => {
        this.item.picUrl = response.file;
        this.imgUrl = this.mediaService.getItemImageUrl(this.item.picUrl);
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
    this.itemForm = this.fb.group(
      {
        name: [this.item.name, [Validators.required]],
        description: [this.item.description, [Validators.required]]
      }
    );
  }

  private formatError(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error && error.message) return error.message;
    if (error) return error;
  }

}
