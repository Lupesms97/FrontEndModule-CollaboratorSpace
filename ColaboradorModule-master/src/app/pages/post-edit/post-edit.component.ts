import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/post/post.service';
import { Post } from 'src/app/shared/models/Post';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private postService: PostService
  ) { }

  post: Post = {
    id: '',
    title: '',
    shortContent: '',
    content: 'fghdfghdfgh',
    date: '',
    imageUrl: ''
  };

  private id: string = '';

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.verifictionOdId(this.id)) {
      this.postService.getPostbyId(this.id).subscribe((post) => {
        this.post = post;
      });
    }
  }

  verifictionOdId(id: string) {
    if (id !== '') {
      this.id = id;
      return true;
    } else {
      this.postService.sendToBlog();
      return false;
    }
  }

  onSubmit(form: NgForm) {
    // Aqui você pode enviar os dados para o servidor ou fazer o que desejar
    this.post.date = new Date().toString();
    this.post.id = uuidv4();
    this.postService.creatPost(this.post);
    form.resetForm();
  }
}
