import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post(
      'https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json', 
      postData
    ).subscribe(response => {
      console.log(response)
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.http.get('https://ng-complete-guide-7fa1f-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData => {
        const postArray = [];
        for (const  key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key })
          }
        }
        return postArray;
      }))
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
