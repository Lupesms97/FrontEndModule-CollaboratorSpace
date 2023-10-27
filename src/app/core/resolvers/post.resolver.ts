import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/models/Post';
import { PostService } from '../post/post.service';

export const postResolver: ResolveFn<Observable<Post[]>> = (route, state) => {

  const postservice = inject(PostService);

  return postservice.getPosts();

};
