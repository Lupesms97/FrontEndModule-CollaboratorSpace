import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Role } from '../../shared/models/Role';
import { PostService } from 'src/app/core/post/post.service';
import { Router } from '@angular/router';

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
    private post:PostService, 
    private router:Router
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

  goToBlog() {
    // Gere um parâmetro aleatório
    this.router.navigate(['home/blog']);
  }
  goToPublisher(){
    this.router.navigate(['/publisher']);
  }
  goToBenefits(){
    
  }
  goToCalendar(){
    this.router.navigate(['/calendar']);
  }

  

}
