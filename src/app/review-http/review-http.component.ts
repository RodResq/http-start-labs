import { Post } from './../post.model';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-http',
  templateUrl: './review-http.component.html',
  styleUrls: ['./review-http.component.css']
})
export class ReviewHttpComponent implements OnInit {

  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { 
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.http
      .post<{ name: string}>(
        'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json',
        postData
      ).subscribe(
        postData => {
          console.log(postData);

        }
      );
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>('https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        let postArray: Post[] = [];
        for(let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }))
      .subscribe(posts => {
        this.loadedPosts = posts;
      });
  }

}
