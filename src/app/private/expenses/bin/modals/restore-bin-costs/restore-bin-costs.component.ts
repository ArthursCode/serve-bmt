import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-restore-costs-dialog',
  templateUrl: './restore-bin-costs.component.html',
  styleUrls: ['./restore-bin-costs.component.scss']
})
export class RestoreBinCostsComponent implements OnInit {
  onRestore = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  restoreCosts() {
    this.onRestore.emit();
  }


}
