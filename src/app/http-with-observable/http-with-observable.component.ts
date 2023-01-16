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
  public loading: boolean = false;
  public results: Observable<any[]>;
  private sub: Subscription;
  public searchItems: SearchItem[] = [];

  constructor(private service: SearchWithObservableService) { }

  ngOnInit(): void {
  }

  doSearch(term: string) {
    this.service.search(term)
      .subscribe((resp: any) => {
        this.loading = true;
        this.searchItems = [];
        resp.results.map((item) => {
          let searchItem = new SearchItem(
            item.trackName,
            item.artistName,
            item.artistViewUrl,
            item.artworkUrl30,
            item.artistId
          );
          this.searchItems.push(searchItem);
        });
        console.log(this.searchItems);
      }, error => console.log('Alguns error ocorreu!'),
        () => this.loading = false
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
