import {
  Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy,
  ViewChild, ElementRef, ChangeDetectorRef, OnChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FileUploadService, PicType } from 'src/app/core/services/file-upload.service';
import { MediaService } from 'src/app/core/services/media.service';
import { Item } from 'src/app/core/models/item.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-item-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit, OnChanges {
  @Input() item: Item;
  @Output() itemSave = new EventEmitter<Item>();
  itemForm: FormGroup;
  @ViewChild('fileControl', { static: false }) fileControl: ElementRef;
  isUploading = false;
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
  }

  ngOnChanges() {
    // Doing this here instead of ngOnInit to handle browser refresh case
    if (this.item) {
      this.item = JSON.parse(JSON.stringify(this.item)); // Object is read-only coming from store
      this.buildForm();
      if (this.item.picUrl) {
        this.imgUrl = this.mediaService.getItemImageUrl(this.item.picUrl);
      }
    }
  }

  onSubmit(): void {
    this.item.name = this.itemForm.controls['name'].value;
    this.item.description = this.itemForm.controls['description'].value;
    this.itemSave.emit(this.item);
  }

  selectFile() {
    this.isUploading = true;
    this.uploadError = null;
    this.uploadService.selectImageAndUpload(PicType.ITEM).pipe(take(1)).subscribe(response => {
      this.item.picUrl = response.file;
      this.imgUrl = this.mediaService.getItemImageUrl(this.item.picUrl);
      this.isUploading = false;
      this.changeDetectorRef.detectChanges();
    }, err => console.log(err));
  }

  private buildForm(): void {
    this.itemForm = this.fb.group(
      {
        name: [this.item.name, [Validators.required]],
        description: [this.item.description, [Validators.required]]
      }
    );
  }

}
