import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/post/post.service';
import { Post } from 'src/app/shared/models/Post';
import { v4 as uuidv4 } from 'uuid';




@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent {

  constructor(
    private postService: PostService,
    private router:Router
  ) { 

  }


   item:Post = {
    id:'',
    title:'',
    content: '',
    shortContent:'',
    date:'',
    imageUrl:''
  };



  onSubmit(form:NgForm) {
    // Aqui você pode enviar os dados para o servidor ou fazer o que desejar
    this.item.date = new Date().toISOString();
    this.item.id = uuidv4();
    this.postService.creatPost(this.item);
    form.resetForm();
  }

  navigateToPublisher(){
    this.router.navigate(['home/blog']);
  }

}


