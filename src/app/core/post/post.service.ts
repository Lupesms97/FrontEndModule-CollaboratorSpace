import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from 'src/app/shared/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API_URL_R = 'http://localhost:8081/posts';
  private posts$: Observable<Post[]> | undefined;
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.refreshPosts();
  }
/*   (`${this.API_URL_R}/getContent`) */
  private setPostsOnObservable(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL_R}/allPosts`)
      .pipe(
        tap((posts) => {
          // Atualiza os posts quando os dados são buscados
          this.posts$ = new Observable<Post[]>((observer) => {
            observer.next(posts);
          });
        })
      );
  }

  public refreshPosts() {
    this.posts$ = this.setPostsOnObservable();
  }

  public getPosts(): Observable<Post[]> {
    return this.posts$ as Observable<Post[]>;
  }

  public getPostbyId(id: string): Observable<Post> {
    return this.posts$!.pipe(
      map((posts) => posts.find(post => post.id === id)!)
    );
  }

  public creatPost(post: Post) {
    this.http.post<Post>(`${this.API_URL_R}/post`, post).subscribe((post) => { console.log(post) });
  }

  public updatePost(post: Post) {
    this.http.post<Post>(`${this.API_URL_R}/atualizationPost`, post).subscribe((post) => { console.log(post) });
    this.refreshPosts();
  }

  public deletePost(id: string) {
    this.http.delete<Post>(`${this.API_URL_R}/postDeletion?postId=${id}`).subscribe((post) => { console.log(post) });
    this.refreshPosts();
  }

  public sendToBlog() {
    this.router.navigate(['home/blog']);
  }
}
