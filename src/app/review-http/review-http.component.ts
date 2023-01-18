import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-http',
  templateUrl: './review-http.component.html',
  styleUrls: ['./review-http.component.css']
})
export class ReviewHttpComponent implements OnInit {

  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

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
  }

  onClearPosts() {
  }

}
