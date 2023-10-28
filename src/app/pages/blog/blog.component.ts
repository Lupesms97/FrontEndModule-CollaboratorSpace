import { AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PostService } from 'src/app/core/post/post.service';
import { Post } from 'src/app/shared/models/Post';
import { Role } from 'src/app/shared/models/Role';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  implements OnInit {
  count:number = 0;
  authorizathion: string = Role.ADMIN;
  p: any = 0;
/*   posts$: Observable<Post[]>; */
  posts: Post[] = [];
/*   dataLoaded = true;
  reloadPage:boolean =true; */

  postCopy: Post = {
    id: '',
    title: '',
    shortContent: '',
    content: '',
    date: '',
    imageUrl: '',
  };
/*   loading$: Observable<boolean>;
 */  private ngUnsubscribe = new Subject();

  constructor(private postService: PostService, private router: Router, private authService: AuthService) {
/*     this.posts$ = this.postService.getPosts(); */
    this.getPosts();
    
/*     this.loading$ = postService.loading$;
 */  }

  ngOnInit() {
/*     this.authorizathion = this.authService.getRoles();
 */    this.getAuthorization();

  }

  getPosts(){
    this.postService.getPosts().subscribe((data) => {
      /* this.posts$ = data; */
      this.posts = data;
      this.sortPostsByDate();
      // Processar os dados conforme necessário
/*       this.dataLoaded = true; */
    });
  }


  goToPost(id: string) {
    this.router.navigate(['posts', id]);
  }

  getDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }

  editFunc(post: Post) {
    this.postCopy = { ...post };
  }

  deleteFunc(post: Post) {
    this.postCopy = { ...post };
  }

  submitEdit(id: string) {
    this.postCopy.date = new Date().toISOString();
    this.postCopy.id = id;

    const updatedPostIndex = this.posts.findIndex((post) => post.id === id);
    if (updatedPostIndex !== -1) {
      this.posts[updatedPostIndex] = { ...this.postCopy };
    }

    this.postService.updatePost(this.postCopy);
  }

  submiDelet(id: string) {
    this.postService.deletePost(id);
    this.posts = this.posts.filter((post) => post.id !== id);
  }

   getAuthorization(): boolean {
    return this.authorizathion === Role.ADMIN || this.authorizathion === 'ADMIN';
  }

  sortPostsByDate() {
    this.posts.sort((a, b) => {
      const dateA = new Date(a.date as string);
      const dateB = new Date(b.date as string);
      return dateB.getTime() - dateA.getTime(); // Ordenar em ordem decrescente
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  navigateToPublisher(){
    this.router.navigate(['publisher']);
  }
  showPublisherButton():boolean{
    if(this.authorizathion=== Role.ADMIN){
     return true;
    }else{
      return false;
    }
  }

}