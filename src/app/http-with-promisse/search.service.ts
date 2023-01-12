import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class SearchService {
    apiRoot: string = 'https://itunes.apple.com/search';
    results: any;
    loading:boolean;

    constructor(private http: HttpClient) {
    }

    search(term: string) {
        let promise = new Promise((resolve, reject) => {
            let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
            this.http.get(apiURL)
                .toPromise()
                .then(
                    resp => {
                        this.results = resp
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