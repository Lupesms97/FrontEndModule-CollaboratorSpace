import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { NotificationService } from 'src/app/core/notificationService/notification.service';
import { IResponseLoginDto } from 'src/app/shared/models/IResponseLoginDto';
import { IUserLogin } from 'src/app/shared/models/IUserLogin';
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

  user: IUserLogin = {
    login: '',
    password: ''
  }

  resp:IResponseLoginDto = {
    token: '',
    acessInfo: {
      permission: [],
      availiableCompanies: []
    }
  }

  autenticar(form: NgForm){
  
    let userLogin:IUserLogin = {
      login: form.value.login,
      password: form.value.password
    }

    this.authService.login(userLogin)
      .subscribe(
        (response: HttpResponse<IResponseLoginDto>) => {

        
        },
        (error) => {     
          
          this.alertMessage = 'Usuário ou senha inválidos';
          this.notifications.showToast(TypeToast.Error, 'Login', 'Usuário ou senha inválidos');
        }
      );

  }


    
}
