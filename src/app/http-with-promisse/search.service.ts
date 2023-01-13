import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchItem } from './search-item.model';

@Injectable({providedIn: 'root'})
export class SearchService {
    apiRoot: string = 'https://itunes.apple.com/search';
    results: SearchItem[] = [];
    loading:boolean;

    constructor(private http: HttpClient) {
    }

    search(term: string) {
        let promise = new Promise((resolve, reject) => {
            let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
            this.http.get(apiURL)
                .toPromise()
                .then(
                    (resp: {resultCount: number, results: any[]}) => {
                        console.log(resp);
                        this.results = resp.results.map(item => {
                            return new SearchItem(
                                item.trackName,
                                item.artistName,
                                item.trackViewUrl,
                                item.artworkUrl30,
                                item.artistId
                            );
                        });
                        resolve(this.results);
                    },
                    msg => {
                        reject(msg);
                    }
                    );

        });
        return promise;
    }

}