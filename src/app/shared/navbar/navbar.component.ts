import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Role } from '../models/Role';
import { PostService } from 'src/app/core/post/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = '';
  role:string = Role.ADMIN;


  constructor(
    private authService:AuthService,
    private post:PostService
  ) {
    this.username = authService.getUserName();
    this.role = authService.getRoles();  
    this.showPublisherButton();
   }

  logout(){
    this.authService.logout();
  }

  showPublisherButton():boolean{
    if(this.role === Role.ADMIN){
     return true;
    }else{
      return false;
    }
  }

  atualizar(){
    this.post.refreshPosts();
  }



  

}
