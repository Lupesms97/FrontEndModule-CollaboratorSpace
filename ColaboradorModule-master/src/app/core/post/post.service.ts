import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Post } from 'src/app/shared/models/Post';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API_URL_R = 'http://localhost:8080/content';
  private readonly API_URL_TEST = 'assets/content.json';


  public posts = new Observable<Post[]>()



  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.posts = this.setPostsOnObservable();
  }


/*   private setPostsOnObservable(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL_R}/getContent`);
  } */
  private setPostsOnObservable(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL_TEST}`);
  }

  public getPosts(): Observable<Post[]> {
    return this.posts;
  }

  public getPostbyId(id: string): Observable<Post> {
    return this.posts.pipe(
      map((posts: Post[]) => posts.find(post => post.id === id)!)
    );
  }

  public creatPost(post:Post) {
    this.http.post<Post>(`${this.API_URL_R}/newContent`, post).subscribe((post) => {console.log(post)});
  }

  public updatePost(post:Post) {
    this.http.put<Post>(`${this.API_URL_R}/updateContent`, post).subscribe((post) => {console.log(post)});
  }

  public deletePost(id:string) {
    this.http.delete<Post>(`${this.API_URL_R}/deleteContent/${id}`).subscribe((post) => {console.log(post)});
  }

  public sendToBlog(){
    this.router.navigate(['blog']);
  }

}
