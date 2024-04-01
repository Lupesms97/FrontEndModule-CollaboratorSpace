import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post } from 'src/app/shared/models/Post';
import { PostPublisher } from 'src/app/shared/models/PostPublisher';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API_URL_R = './assets/content.json';
  private posts$: Observable<Post[]> | undefined;
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.refreshPosts();
  }
/*   /allPosts
 */  private setPostsOnObservable(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL_R}`)
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

  public createPost(post: PostPublisher): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL_R}/post`, post).pipe(
      tap((newPost) => {
        // Você pode remover ou personalizar o que deseja fazer com a resposta
        this.refreshPosts();
      })
    );
  }

  public updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.API_URL_R}/update`, post).pipe(
      tap((updatedPost) => {
       // personalizar o que deseja fazer com a resposta
        this.refreshPosts();
      })
    );
  }

  public deletePost(id: string): Observable<any> {
    return this.http.delete<Post>(`${this.API_URL_R}/postDeletion?postId=${id}`).pipe(
      tap((deletedPost) => {
        console.log(deletedPost); // Você pode remover ou personalizar o que deseja fazer com a resposta
        this.refreshPosts();
      })
    );
  }

  public sendToBlog() {
    this.router.navigate(['home/blog']);
  }
}
