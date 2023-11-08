import { formatDate, registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/post/post.service';
import { PostPublisher } from 'src/app/shared/models/PostPublisher';
import localePt from '@angular/common/locales/pt';
import { NotificationService } from 'src/app/core/notificationService/notification.service';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';
import { UserLogin } from 'src/app/shared/models/UserLogin';




@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent {

  constructor(
    private postService: PostService,
    private router:Router, private notifications: NotificationService
  ) { 
    registerLocaleData(localePt);
  }


   item:PostPublisher = {
     title: '',
     content: '',
     shortContent: '',
     date: new Date(),
     imageUrl: '',
     
   };

  onSubmit(form:NgForm) {
    // Aqui você pode enviar os dados para o servidor ou fazer o que desejar
    this.item.date = new Date(this.item.date);
    this.postService.createPost(this.item)
    .subscribe(
      (response) => {
        this.notifications.showToast(TypeToast.Success, 'POST', 'Post criado com sucesso');
      },
      (error) => {
        this.notifications.showToast(TypeToast.Error, 'POST', 'Erro ao criar post');
      }
    );

    console.log(this.item);
    form.resetForm();
  }

  navigateToPublisher(){
    this.router.navigate(['home/blog']);
  }

  user: UserLogin = {
    login: '',
    password: ''
  }

  autenticar(ng: NgForm){}

}


