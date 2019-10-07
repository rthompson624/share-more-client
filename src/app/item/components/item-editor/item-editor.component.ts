import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../../core/models/item.model';

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

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.item) this.buildForm();
  }

  onSubmit(): void {
    this.item.name = this.itemForm.controls['name'].value;
    this.item.description = this.itemForm.controls['description'].value;
    this.itemSave.emit(this.item);
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
