import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  onSave = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  saveEmployee() {
    this.onSave.emit();
  }

}
