import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PostModule } from './post/post.module';
import { AuthService } from './auth/auth.service';
import { ContentInterceptor } from './interceptors/content.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AuthModule,
    HttpClientModule,
    PostModule,

  ],
  exports:[
    AuthModule,
    PostModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,useClass:ContentInterceptor,multi:true
    }
  ]
})
export class CoreModule { }
