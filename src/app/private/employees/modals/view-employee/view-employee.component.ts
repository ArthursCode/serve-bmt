import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as _moment from 'moment';
import {tableDateFormat} from '../../../../common/constants/constants';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {}

  getDate(dateOfBirth) {
    return _moment(dateOfBirth, 'MM-DD-YYYY').format(tableDateFormat);
  }

}
