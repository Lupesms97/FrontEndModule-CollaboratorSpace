import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/app/environments/variables.environments';
import { TrailsResume } from 'src/app/shared/models/TrailsResume';
import { AuthService } from '../auth/auth.service';
import { IToken } from 'src/app/shared/models/IToken';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TrailService {

  private $listResumeTrails: BehaviorSubject<TrailsResume[]> = new BehaviorSubject<TrailsResume[]>([]);
  private identityOfUser = new BehaviorSubject<string | null>(null);
  private courseOnDetils: BehaviorSubject<TrailsResume> = new BehaviorSubject<TrailsResume>({} as TrailsResume);

  private readonly URL = 'assets/cr.json';

  private cookieService = inject(CookieService)

  constructor(
    private http : HttpClient,
    private authService: AuthService
  ) {
/*   this.authService.user$.subscribe((user) => {
  if (user) {
    this.identityOfUser.next(user.token);
    this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.getToken(environment.TOKEN_KEY)}`);
  }}); */
  this.refresehTrails();

  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.identityOfUser.value}`
    }),
  };



  private setOnObservable(): Observable<HttpResponse<TrailsResume[]>> {
    return this.http.get<TrailsResume[]>(`${this.URL}`, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<TrailsResume[]>) => {
          this.$listResumeTrails.next(response.body!);
        })
      )
  }

  public refresehTrails() {
    this.setOnObservable().subscribe();
  }

  public getResumeTrails():Observable<TrailsResume[]>{
    return this.$listResumeTrails.asObservable();
  }

  public  setOnDetalis(id: string): BehaviorSubject<TrailsResume> {
    this.cookieService.set(environment.LAST_TRAIL_ON, id);
    const course = this.$listResumeTrails.value.find((course) => course.resourceLocation === id)!;
    this.courseOnDetils.next(course);
    return this.courseOnDetils;
  }

  public getTrailOnDetils():Observable<TrailsResume>{
    if(this.courseOnDetils.value.resourceLocation === ''){
      const id = this.cookieService.get(environment.LAST_TRAIL_ON);
      if(id){
        this.setOnDetalis(id);
        return this.courseOnDetils.asObservable(); 
      }
    }
    return this.courseOnDetils.asObservable(); 
  }

  public cleanTrailOnDetils(){
    this.cookieService.delete(environment.LAST_TRAIL_ON);
    this.courseOnDetils.next({} as TrailsResume);
  }
  




}
