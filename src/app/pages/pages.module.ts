import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { BlogComponent } from './blog/blog.component';
import { PublisherComponent } from './publisher/publisher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { TiComponent } from './ti/ti.component';
import { AvailableTrailsComponent } from './available-trails/available-trails.component';
import { ComponentModule } from '../components/components.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { TrailsModule } from './trails/trails.module';


@NgModule({
  declarations: [  
    BlogComponent,
    PublisherComponent,
    BlogDetailsComponent,
    CalendarComponent,
    ProfileComponent,
    BenefitsComponent,
    TiComponent,
    AvailableTrailsComponent,
    LoginPageComponent
  ],
  imports: [
    PagesRoutingModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }), 
    NavbarComponent,
    TrailsModule
    ],
  exports: [CalendarComponent,NavbarComponent, ComponentModule],

})
export class PagesModule { }
