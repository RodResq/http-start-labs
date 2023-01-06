import { PostsService } from './posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators/map'

import { Post } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching: boolean;
  error = null;
  erroSub: Subscription;

  constructor(
    private http: HttpClient,
    private postsService: PostsService) 
    {}

  ngOnInit() {
    this.erroSub = this.postsService.error.subscribe(
      errorMessage => {
        this.error = errorMessage;
      }
    )

    this.isFetching = true
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
    },error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePosts(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(
      () => {
        this.loadedPosts = []
      })
  }

  onHandlerError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.erroSub.unsubscribe();
  }
}
