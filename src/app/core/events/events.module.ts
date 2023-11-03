import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from './events.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContentInterceptor } from '../interceptors/content.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,useClass:ContentInterceptor,multi:true
    }
  ]

})
export class EventsModule { }
