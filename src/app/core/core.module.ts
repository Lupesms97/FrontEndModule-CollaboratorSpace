import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { PostModule } from './post/post.module';
import { AuthService } from './auth/auth.service';



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
  ]
})
export class CoreModule { }
