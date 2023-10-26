import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ResponseDto } from 'src/app/shared/models/ResponseDto';
import { UserLogin } from 'src/app/shared/models/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService,
    private router: Router) {}
  alertMessage: any = ''
  exibirAlert: boolean = false;

  user: UserLogin = {
    login: '',
    password: ''
  }

  resp:ResponseDto = {
    token: '',
    message: ''
  }




  autenticar(form: NgForm){
    let userLogin:UserLogin = {
      login: form.value.login,
      password: form.value.password
    }

    this.authService.login(userLogin.login, userLogin.password)
      .subscribe(
        (response: HttpResponse<ResponseDto>) => {
          const token = response.body?.token;
          const status = response.status;
          const role:string = this.authService.decodeJwt(token!).roles;
          this.exibirAlert = true;
          this.alertMessage = response.body?.message;
          
        },
        (error) => {
          this.exibirAlert = true;
          this.alertMessage = 'Usuário ou senha inválidos';
          console.log(error);
        }
      );
      this.exibirAlert = false;
  }
    
}
