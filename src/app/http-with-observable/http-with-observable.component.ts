import { Subscription, Observable } from 'rxjs';
import { SearchItem } from './../http-with-promisse/search-item.model';
import { SearchWithObservableService } from './search-with-obsevable.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';

@Component({
  selector: 'app-http-with-observable',
  templateUrl: './http-with-observable.component.html',
  styleUrls: ['./http-with-observable.component.css']
})
export class HttpWithObservableComponent implements OnInit, OnDestroy {
  private loading: boolean = false;
  public results: Observable<any[]>;
  private sub: Subscription;

  constructor(private service: SearchWithObservableService) { }

  ngOnInit(): void {
  }

  doSearch(term: string) {
    this.service.search(term)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = true;
      }, err => console.log('An error occurs!'),
      () => this.loading = false
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
