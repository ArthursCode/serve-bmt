import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ExpensesService} from "../expenses.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import * as _moment from "moment";
import {dateTimeFormat, tableDateFormat} from "../../../common/constants/constants";
import {RemoveCostsComponent} from "./modals/remove-costs/remove-costs.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['checkbox', 'category', 'payment_date', 'sub_category', 'sum', 'time', 'actions'];
  dataSource = [];
  allChecked = false;
  zero = 0;

  length = 0;
  total = 0;

  costListParams = {
    current: 1,
    per_page: 10
  }

  constructor(private expensesService: ExpensesService,
              private toastr: ToastrService,
              private translate: TranslateService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCostsList(this.costListParams);
  }

  getCostsList(event) {
    this.allChecked = false;
    this.expensesService.getExpensesList(event).subscribe(
      res => {
        if(res){
          this.length = res.length;
          this.total = res.total;
          this.dataSource = res.data;
        }
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  adjustText(el){
    if(el.category !== 'other'){
      return el.sub_category.replace('_', ' ');
    }
    return el.sub_category
  }

  formatDate(date){
    if(date){
      return _moment(date, 'MM-DD-YYYY').format(tableDateFormat)
    }
    return '';
  }

  formatTime(date){
    if(date){
      return _moment(date).format(dateTimeFormat);
    }
    return '';
  }

  getCategory(category) {
    if(category === 'other'){
      return 'Other Costs'
    }
    if(category === 'staff'){
      return 'Staff And Benefits'
    }
    if(category === 'operating'){
      return 'Operating Costs'
    }
    if(category === 'admin'){
      return 'Administrative Costs'
    }
  }

  removeOne(elem) {
    let dialogRef = this.dialog.open(RemoveCostsComponent);
    dialogRef.componentInstance.onRemove.subscribe(() => {
      this.removeRecords([elem]);
      dialogRef.close();
    });
  }

  removeSelected() {
    let data = [];
    this.dataSource.map(el => {
      if(el.isSelected){
        data.push(el);
      }
    });
    let dialogRef = this.dialog.open(RemoveCostsComponent);
    dialogRef.componentInstance.onRemove.subscribe(() => {
      this.removeRecords(data);
      dialogRef.close();
    });
  }

  removeRecords(data) {
    this.expensesService.removeExpenses(data).subscribe(
      res => {
        this.translate.get(res.message || 'SUCCESS').subscribe((text:string) => {
          this.toastr.success(text);
        });
        this.getCostsList(this.costListParams);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text:string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  changeOneCheckBox(ev, elem) {
    elem.isSelected = ev.checked;
  }

  evenOneSelected(){
     return this.dataSource.some(el => {
      return el.isSelected === true;
    });
  }

  changeGlobCheckbox(ev) {
    this.dataSource.map(el => {
      el.isSelected = ev.checked;
    });
  }
}
