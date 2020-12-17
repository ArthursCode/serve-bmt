import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-remove-bin-costs-dialog',
  templateUrl: './remove-bin-costs.component.html',
  styleUrls: ['./remove-bin-costs.component.scss']
})
export class RemoveBinCostsComponent implements OnInit {
  onRemove = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }
  removeCosts() {
    this.onRemove.emit();
  }


}
