import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-employee',
  templateUrl: './auth-employee.component.html',
  styleUrls: ['./auth-employee.component.scss']
})
export class AuthEmployeeComponent implements OnInit {

  onSave = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  saveAuth() {
    this.onSave.emit();
  }

}
