import { Injectable, NgModule } from '@angular/core';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BlogComponent } from './blog/blog.component';
import { PublisherComponent } from './publisher/publisher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import {FormGroup, FormControl} from '@angular/forms';
import { BenefitsComponent } from './benefits/benefits.component';
import { TiComponent } from './ti/ti.component';

@NgModule({
  declarations: [  
    BlogComponent,
    PublisherComponent,
    BlogDetailsComponent,
    CalendarComponent,
    ProfileComponent,
    NavbarComponent,
    BenefitsComponent,
    TiComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),

  ],
  exports: [CalendarComponent],

})
export class PagesModule { }
