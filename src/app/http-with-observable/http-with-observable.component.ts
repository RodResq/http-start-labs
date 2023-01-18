import { debounceTime } from 'rxjs-compat/operator/debounceTime';
import { Subscription, Observable } from 'rxjs';
import { SearchItem } from './../http-with-promisse/search-item.model';
import { SearchWithObservableService } from './search-with-obsevable.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs-compat/operators/map';

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
    this.loading = true;
    this.sub = this.service.search(term)
      .pipe(map(tracks => {
        let searchItems: SearchItem[] = [];
        if (tracks.results.length > 0) {
          for (let track of tracks.results) {
            if (track.hasOwnProperty('trackId')) {
              searchItems.push(new SearchItem(
                track['trackName'],
                track['artistName'], 
                track['artistViewUrl'], 
                track['artworkUrl30'],
                track['artistId'])
              );
            }
          };
        }
        return searchItems;
      }))
      .subscribe(respData => {
        if (respData) {
          this.searchItems = respData;
        }
      });
      
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
