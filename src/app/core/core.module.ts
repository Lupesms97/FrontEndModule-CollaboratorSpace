import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ContentInterceptor } from './interceptors/content.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
  ],
  providers:[
    AuthService
 /*    ,{
        provide: HTTP_INTERCEPTORS,useClass:ContentInterceptor,multi:true
      } */
  ]
  
})
export class CoreModule { }
