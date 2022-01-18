import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  template: ''
})
export abstract class MainComponent implements OnDestroy {

  protected unsubscriber: ReplaySubject<any> = new ReplaySubject();

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
