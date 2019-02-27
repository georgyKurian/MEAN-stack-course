import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postList: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              id      : post._id,
              title   : post.title,
              content : post.content
            };
          });
        })
      )
      .subscribe(postData => {
        this.postList = postData;
        this.postUpdated.next([...this.postList]);
      });
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.postList.push(post);
        this.postUpdated.next([...this.postList]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
