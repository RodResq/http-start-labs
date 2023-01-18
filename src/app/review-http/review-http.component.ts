import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-http',
  templateUrl: './review-http.component.html',
  styleUrls: ['./review-http.component.css']
})
export class ReviewHttpComponent implements OnInit {

  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() { 
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post(
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
      .get('https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        let postArray = [];
        for(let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }))
      .subscribe(posts => {
        console.log(posts);
      });
  }

}
