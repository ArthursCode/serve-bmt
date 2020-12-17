import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-settings-dialog',
  templateUrl: './save-costs.component.html',
  styleUrls: ['./save-costs.component.scss']
})
export class SaveCostsComponent implements OnInit {
  onSave = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  saveCosts() {
    this.onSave.emit();
  }


}
