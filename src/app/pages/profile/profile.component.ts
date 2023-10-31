import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';


const LOCALE_ID='pt-BR';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

username: string = '';
lastAcess:Date;


constructor(private authService:AuthService) {
  this.username = authService.getUserName();
  this.lastAcess = new Date(); 
  registerLocaleData(LOCALE_ID);
}

}
