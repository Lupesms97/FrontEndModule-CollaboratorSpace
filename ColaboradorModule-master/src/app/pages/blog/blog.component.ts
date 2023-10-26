import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/post/post.service';
import { Post } from 'src/app/shared/models/Post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  
  public posts: Post[] = [];

  

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {
    this.postService.posts.subscribe((posts) => {
      this.posts = posts;
      this.sortPostsByDate();;
    });
  }

  goToPost(id: string) {
    this.router.navigate(['posts', id]);
  }


  getDate(dateString:string): string{
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('pt-BR', options);
    return formattedDate
  }

  sortPostsByDate() {
    this.posts.sort((a, b) => {
      const dateA = new Date(a.date as string);
      const dateB = new Date(b.date as string);
      return dateB.getTime() - dateA.getTime(); // Ordenar em ordem decrescente
    });
  }

  edit(id:string) {
    this.router.navigate(['edit', id]);
  }
  deletPost(id:string){
/*     this.postService.deletePost(id);

 */ 
    console.log(id);
 }
}  
