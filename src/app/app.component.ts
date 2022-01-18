import { Component, OnInit } from '@angular/core';
import { DataBaseService } from './core/data-base/data-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private bd: DataBaseService) {
  }

  ngOnInit(): void {
    this.bd.init();
  }
}
