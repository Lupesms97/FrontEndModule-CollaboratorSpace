import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService } from './events.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    EventsService
  ]


})
export class EventsModule { }
