import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  onSave = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  saveEmployee() {
    this.onSave.emit();
  }

}
