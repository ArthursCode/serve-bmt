import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-employee',
  templateUrl: './remove-employee.component.html',
  styleUrls: ['./remove-employee.component.scss']
})
export class RemoveEmployeeComponent implements OnInit {

  onRemove = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}
  removeEmployee() {
    this.onRemove.emit();
  }

}
