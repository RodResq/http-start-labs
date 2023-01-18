import { debounceTime } from 'rxjs-compat/operator/debounceTime';
import { map, tap } from 'rxjs/operators';
import { SearchItem } from './../http-with-promisse/search-item.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class SearchWithObservableService {
    urlApi: string = 'https://itunes.apple.com/search';

    constructor(private http: HttpClient) {}

    search(term: string): Observable<any> {
        let params = new HttpParams();
        params = params.append('term', term);
        params = params.append('media', 'music');
        params = params.append('limit', '20');
        return this.http
        .get(
            this.urlApi, 
            { params: params }
        );
    }
}