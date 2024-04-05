import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Role } from '../models/Role';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
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
