import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { BehaviorSubject, Observable, ignoreElements, map, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserCadastro } from 'src/app/shared/models/UserCadastro';
import { UserInterface } from 'src/app/shared/models/UserInterface';
import { Role } from 'src/app/shared/models/Role';
import { ResponseDto } from 'src/app/shared/models/ResponseDto';

const TOKEN_KEY = '_tky-usr';
const ROLES_KEY = '_rly-usr';
const USER_NAME = 'name';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserCadastro | null>(null);
  user$ = this.user.asObservable();
  isLogged$: Observable<boolean> = this.user$.pipe(map(Boolean));

  private readonly API_URL = 'http://localhost:8081/auth';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<{user: UserInterface}>
  ) {
    const token = this.getToken(TOKEN_KEY);
    if (token) {
      const decodedToken = this.decodeJwt(token);
      this.user.next(decodedToken);
    }

  }

  newUser(
    email: string,
    password: string,
    name: string,
    unidade: string,
    role: string
  ): Observable<HttpResponse<any>> {
    const roleAsRole: Role = role == 'ADMIN' ? Role.ADMIN : Role.USER;
    const user: UserCadastro = {
      email,
      login: email,
      password,
      name,
      unidade,
      role: roleAsRole,
    };

    return this.http.post<HttpResponse<any>>(
      `${this.API_URL}/register`,
      user,
      this.httpOptions
    );
  }

  login(
    login: string,
    password: string
  ): Observable<HttpResponse<ResponseDto>> {
    return this.http
      .post<ResponseDto>(
        `${this.API_URL}/login`,
        { login, password },
        { ...this.httpOptions, observe: 'response' }
      )
      .pipe(
        tap((resp) => {
          const token = resp.body!.token;
          const roles = this.decodeJwt(token).roles
          const userName = this.decodeJwt(token).name
          const user: UserInterface = {
            token: token,
            role: roles,
            userName: userName
          }
          this.store.dispatch({type: 'loadUser', payload: user});
          this.setCookie(TOKEN_KEY, token, 1);
          const decodedToken = this.decodeJwt(token);
          this.setRoles(decodedToken.roles);
          this.redirectToBlog();
        }),
        ignoreElements()
      );
  }

  logout() {
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.delete(ROLES_KEY);
    this.router.navigateByUrl('/login');
    this.store.dispatch({type: 'reset'});
  }

  private setCookie(name: string, value: string, expires?: number) {
    if (expires) {
      const today: Date = new Date();
      const expiresDate: Date = new Date(
        today.getTime() + expires * 24 * 60 * 60 * 1000
      ); // Multiplica por milissegundos para calcular a data correta
      this.cookieService.set(name, value, { expires: expiresDate });
    } else {
      this.cookieService.set(name, value);
    }
  }

  getToken(value: string) {
    return this.cookieService.get(value);
  }

  decodeJwt(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  getUserName(): string {
    if(this.getToken(TOKEN_KEY)){
      return this.decodeJwt(this.getToken(TOKEN_KEY)).name;
    }else{
      return this.getToken(USER_NAME);
    }
     
  }

  getRoles(){
    return this.getToken(ROLES_KEY);
  }

  cleanRoles() {
    this.user.next(null);
  }

  setRoles(roles: Role) {
    let user = { role: roles } as UserCadastro;
    this.user.next(user);
    this.setCookie(ROLES_KEY, roles);
  }

  private redirectToBlog() {
    this.router.navigate(['home'])
  }
}
