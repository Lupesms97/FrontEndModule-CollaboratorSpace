import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/variables.environments';
import { CourseResume } from 'src/app/shared/models/CourseResume';
import { AuthService } from '../auth/auth.service';
import { IToken } from 'src/app/shared/models/IToken';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private $listResumeCourses: BehaviorSubject<CourseResume[]> = new BehaviorSubject<CourseResume[]>([]);
  private identityOfUser = new BehaviorSubject<string | null>(null);

  private readonly URL = 'assets/cr.json';

  constructor(
    private http : HttpClient,
    private authService: AuthService
  ) {
/*   this.authService.user$.subscribe((user) => {
  if (user) {
    this.identityOfUser.next(user.token);
    this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.getToken(environment.TOKEN_KEY)}`);
  }}); */
  this.refresehCourses();

  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.identityOfUser}`
    }),
  };



  private setOnObservable(): Observable<HttpResponse<CourseResume[]>> {
    return this.http.get<CourseResume[]>(`${this.URL}`, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<CourseResume[]>) => {
          this.$listResumeCourses.next(response.body!);
        })
      )
  }

  public refresehCourses() {
    this.setOnObservable().subscribe();
  }

  public getResumeCourses():Observable<CourseResume[]>{
    return this.$listResumeCourses.asObservable();
  }


}
