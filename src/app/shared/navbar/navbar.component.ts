import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Role } from '../models/Role';
import { PostService } from 'src/app/core/post/post.service';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { NotificationService } from 'src/app/core/notificationService/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = '';
  authorizathion:string = Role.UNDEFINED_ROLE;


  constructor(
    private authService:AuthService,    
    private router:Router
  ) {
    this.username = authService.getUserName();
    this.authorizathion = authService.getRoles();  
    this.showPublisherButton();

   }

  logout(){
    this.authService.logout();
    
  }

  showPublisherButton():boolean{
    if(this.authorizathion === Role.ADMIN){
     return true;
    }else{
      return false;
    }
  }

  navigateTo(path:string){
    this.router.navigate([path]);

  }

  

}
