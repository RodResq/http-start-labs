import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
            post
        ).subscribe(post => {
            console.log(post);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPost() {
        return this.http
        .get<{ [key: string]: Post }>('https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json')
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
        return this.http.delete('https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json');
    }

}