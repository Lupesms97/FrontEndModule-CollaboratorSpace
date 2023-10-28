import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

username: string = '';

constructor(private authService:AuthService) {
  this.username = authService.getUserName();
}

}
