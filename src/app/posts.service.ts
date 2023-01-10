import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';

import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {

    }

    createAndStorePosts(title: string, content: string) {
        const postData : Post = {title: title, content: content};
        this.http.post<{ name: string}>(
            'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json', 
            postData,
            {
                observe: 'response'
            }
          ).subscribe(response => {
            console.log(response)
          }, error => {
            this.error.next(error.message);
          });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('cutom', 'key');
        return this.http.get<{[key: string]: Post}>(
            'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json',
            { 
                headers: new HttpHeaders({'Custon-Header': 'Hello'}),
                params: searchParams,
                responseType: 'json'
            }
        )
        .pipe(
            map(responseData => {
            const postArray: Post[] = [];
            for (const  key in responseData) {
            if (responseData.hasOwnProperty(key)) {
                postArray.push({ ...responseData[key], id: key })
            }
            }
            return postArray;
        }),
            catchError(errorRes => {
                return throwError(errorRes);
            })
        );
    }

    deletePosts() {
        return this.http
            .delete(
                'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json',{ 
                observe: 'events',
                responseType: 'json' 
            })
            .pipe(
                tap(
                    event => {
                        console.log(event)
                        if (event.type === HttpEventType.Sent) {

                        }
                        if (event.type === HttpEventType.Response) {
                            console.log(event.body);
                        }
                    }
                ));
    }

}