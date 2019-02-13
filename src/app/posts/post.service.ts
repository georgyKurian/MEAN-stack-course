import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postList: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.postList];
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.postList.push(post);

    this.postUpdated.next([...this.postList]);
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
}
