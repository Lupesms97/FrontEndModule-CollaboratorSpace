import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogComponent } from './blog/blog.component';
import { PublisherComponent } from './publisher/publisher.component';
import { FormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [  
    BlogComponent, PublisherComponent, BlogDetailsComponent,  NavbarComponent, CalendarComponent, ProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    
  ],
  exports: [CalendarComponent],
  providers: [
    
  ]
})
export class PagesModule { }
