import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs-compat/operators/map';
import { Post } from '../post.model';

@Injectable({ providedIn: 'root' })
export class ReviewPostsService {
    error = new Subject<String>();

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const post: Post = {title: title, content: content};
        this.http
        .post<{ name: string}>(
            'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json',
            post,
            {
                observe: 'response'
            }
        ).subscribe(responseData => {
            console.log(responseData.body);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPost() {
        let searchParams = new HttpParams();
        searchParams = searchParams.set('print', 'pretty');
        searchParams = searchParams.set('custom', 'key');
        return this.http
        .get<{ [key: string]: Post }>(
            'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
                params: searchParams,
                responseType: 'json'
            }
        )
        .pipe(
            map(responseData => {
            let postArray: Post[] = [];
            for(let key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                    postArray.push({ ...responseData[key], id: key });
                }
            }
            return postArray;
        }), 
            catchError(errorResp => {
                return throwError(errorResp);
            })
        );
    }

    deletePosts() {
        return this.http.delete(
            'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(
            tap(event => {
                console.log(event);
                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }
            })
        );
    }

}