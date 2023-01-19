import { ReviewPostsService } from './review-posts.service';
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
  fetchingPost = false;

  constructor(
    private http: HttpClient,
    private reviewPostService: ReviewPostsService) { }

  ngOnInit() { 
    this.fetchingPost = true;
    this.reviewPostService.fetchPost().subscribe(
      posts => {
        this.fetchingPost = false;
        this.loadedPosts = posts;
      }
    );
  }

  onCreatePost(postData: Post) {
    this.reviewPostService.createAndStorePost(postData.title, postData.content);
    this.fetchPosts();
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
  }

  private fetchPosts() {
    this.fetchingPost = true;
    this.reviewPostService.fetchPost().subscribe(
      posts => {
        this.fetchingPost = false;
        this.loadedPosts = posts;
      }
    );
  }

}
