import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-department',
  templateUrl: './remove-department.component.html',
  styleUrls: ['./remove-department.component.scss']
})
export class RemoveDepartmentComponent implements OnInit {

  onRemove = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  removeDepartment() {
    this.onRemove.emit();
  }

}
