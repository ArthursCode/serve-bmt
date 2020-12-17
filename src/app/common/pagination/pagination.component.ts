import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() length;
  @Input() total;
  @Input() itemsPerPage;
  @Output() switchPage = new EventEmitter();

  currentPage = 1;

  constructor() { }

  ngOnInit() {}

  changePage(direction){
    if (this.currentPage === this.length && direction === 'next') {
      return;
    }
    if (this.currentPage === 1 && direction === 'prev') {
      return;
    }
    direction === 'next' ? this.currentPage++ : this.currentPage--;
    this.switchPage.emit({current: this.currentPage, per_page: this.itemsPerPage});
  }

}
