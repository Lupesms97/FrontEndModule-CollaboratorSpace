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

  private readonly API_URL_R = '/assets/content.json';
  public posts$: Observable<Post[]> | undefined;
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.refreshPosts();
  }
/*   (`${this.API_URL_R}/getContent`) */
  private setPostsOnObservable(): Observable<Post[]> {
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

  public creatPost(post: Post) {
    this.http.post<Post>(`${this.API_URL_R}/newContent`, post).subscribe((post) => { console.log(post) });
  }

  public updatePost(post: Post) {
    this.http.put<Post>(`${this.API_URL_R}/updateContent`, post).subscribe((post) => { console.log(post) });
    this.refreshPosts();
  }

  public deletePost(id: string) {
    this.http.delete<Post>(`${this.API_URL_R}/deleteContent/${id}`).subscribe((post) => { console.log(post) });
    this.refreshPosts();
  }

  public sendToBlog() {
    this.router.navigate(['blog']);
  }
}
