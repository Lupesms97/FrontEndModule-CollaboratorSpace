import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { NotificationService } from 'src/app/core/notificationService/notification.service';
import { ResponseDto } from 'src/app/shared/models/ResponseDto';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';
import { UserLogin } from 'src/app/shared/models/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private authService: AuthService,
    private router: Router,
    private notifications: NotificationService
    ) {}
  alertMessage: any = ''

  user: UserLogin = {
    login: '',
    password: ''
  }

  resp:ResponseDto = {
    token: '',
    message: ''
  }






  autenticar(form: NgForm){
    this.router.navigate(['//home/news']);
/*     let userLogin:UserLogin = {
      login: form.value.login,
      password: form.value.password
    }

    this.authService.login(userLogin.login, userLogin.password)
      .subscribe(
        (response: HttpResponse<ResponseDto>) => {
          const token = response.body?.token;
          const status = response.status;
          const role:string = this.authService.decodeJwt(token!).roles;
          this.alertMessage = response.body?.message;       
        },
        (error) => {          this.alertMessage = 'Usuário ou senha inválidos';
          this.notifications.showToast(TypeToast.Error, 'Login', 'Usuário ou senha inválidos');
        }
      ); */

  }

    
}
