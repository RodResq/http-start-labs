import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Post } from './post.model';

import { map } from 'rxjs/operators/map'

@Injectable({ providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {

    }

    createAndStorePosts(title: string, content: string) {
        const postData : Post = {title: title, content: content};
        this.http.post<{ name: string}>(
            'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json', 
            postData
          ).subscribe(response => {
            console.log(response)
          });
    }

    fetchPosts() {
        return this.http.get<{[key: string]: Post}>('https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json')
        .pipe(
            map(responseData => {
            const postArray: Post[] = [];
            for (const  key in responseData) {
            if (responseData.hasOwnProperty(key)) {
                postArray.push({ ...responseData[key], id: key })
            }
            }
            return postArray;
        }));
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json');
    }

}