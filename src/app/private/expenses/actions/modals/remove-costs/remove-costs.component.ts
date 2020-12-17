import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-settings-dialog',
  templateUrl: './remove-costs.component.html',
  styleUrls: ['./remove-costs.component.scss']
})
export class RemoveCostsComponent implements OnInit {
  onRemove = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  removeCosts() {
    this.onRemove.emit();
  }


}
