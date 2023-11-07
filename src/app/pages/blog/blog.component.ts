import { AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, interval, map } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { NotificationService } from 'src/app/core/notificationService/notification.service';
import { PostService } from 'src/app/core/post/post.service';
import { Post } from 'src/app/shared/models/Post';
import { Role } from 'src/app/shared/models/Role';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  implements OnInit {
  count:number = 0;
  authorizathion: string = Role.UNDEFINED_ROLE;
  p: any = 0;
/*   posts$: Observable<Post[]>; */
  posts: Post[] = [];
  dataLoaded = false;
  reloadPage:boolean =true; 

  postCopy: Post = {
    id: '',
    title: '',
    shortContent: '',
    content: '',
    date: '',
    imageUrl: '',
  };

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService) 
    {
    this.getPosts();
    this.authorizathion = this.authService.getRoles();
    
  }

  ngOnInit() {
   this.getAuthorization();

  }

  getPosts(){
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      this.sortPostsByDate();
      this.dataLoaded = true;

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

    this.postService.updatePost(this.postCopy).subscribe(
      (response) => {
        this.notification.showToast(TypeToast.Success, 'POST', 'Post atualizado com sucesso');
      },
      (error) => {
        this.notification.showToast(TypeToast.Error, 'POST', 'Não foi possivel atualizar');

      }
    );
  }

  submiDelet(id: string) {
    this.postService.deletePost(id)
    .subscribe(
      (response) => {
        this.notification.showToast(TypeToast.Error, 'POST', 'Não foi possivel deletar');
      },
      (error) => {
        this.notification.showToast(TypeToast.Success, 'POST', 'Post deletado com sucesso');
      }
    )
    ;
    this.posts = this.posts.filter((post) => post.id !== id);
  }

   getAuthorization(): boolean {
    if(this.authorizathion === Role.ADMIN){
      return true;
    }else{
      return false;
    }
  }

  sortPostsByDate() {
    this.posts.sort((a, b) => {
      const dateA = new Date(a.date as string);
      const dateB = new Date(b.date as string);
      return dateB.getTime() - dateA.getTime(); 
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