import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() categories: any[];
  @Input() expenses: any[];

  constructor() { }

  ngOnInit() {
  }

}
