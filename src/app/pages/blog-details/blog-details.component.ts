import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/post/post.service';
import { Post } from 'src/app/shared/models/Post';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {

  post: Post = {
      id:'',
      title:'',
      shortContent: '',
      content:'',
      date:'',
      imageUrl:''
    }
  
    private id: string = '';
  
    constructor(
      private router: ActivatedRoute,
      private postService: PostService
    ) { 
  
    }
  
    ngOnInit(): void {
      this.router.params.subscribe(params => {
        this.id = params['id'];
      });
      if(this.verifictionOdId(this.id)){
        this.postService.getPostbyId(this.id).subscribe((post) => {
          this.post = post;
        });
      }
  
    }
    verifictionOdId(id :string){
      if(id!==''){
        this.id = id;
        return true;
      }else{
        this.postService.sendToBlog();
        return false;
      }
  
    } 
    goBack(){
      this.postService.sendToBlog();
    }

}
