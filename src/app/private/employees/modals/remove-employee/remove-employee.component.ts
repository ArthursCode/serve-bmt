import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-remove-employee',
  templateUrl: './remove-employee.component.html',
  styleUrls: ['./remove-employee.component.scss']
})
export class RemoveEmployeeComponent implements OnInit {

  onRemove = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  removeEmployee() {
    this.onRemove.emit();
  }

}
