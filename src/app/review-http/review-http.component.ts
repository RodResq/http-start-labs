import { ReviewPostsService } from './review-posts.service';
import { Post } from './../post.model';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-http',
  templateUrl: './review-http.component.html',
  styleUrls: ['./review-http.component.css']
})
export class ReviewHttpComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  fetchingPost = false;
  error = null;
  private errorSub: Subscription;

  constructor(
    private http: HttpClient,
    private reviewPostService: ReviewPostsService) { }

  ngOnInit() { 

    this.errorSub = this.reviewPostService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    );
    this.fetchingPost = true;
    this.reviewPostService.fetchPost().subscribe(
      posts => {
        this.fetchingPost = false;
        this.loadedPosts = posts;
      }, err => {
        this.fetchingPost = false;
        this.error = err.message;
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
    this.reviewPostService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  private fetchPosts() {
    this.fetchingPost = true;
    this.reviewPostService.fetchPost().subscribe(
      posts => {
        this.fetchingPost = false;
        this.loadedPosts = posts;
      }, err => {
        this.fetchingPost = false
        this.error = err.message;
      }
    );
  }

  handleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
