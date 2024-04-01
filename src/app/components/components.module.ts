import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components-routing.module';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';
import { AvailableTrailsListComponent } from './available-trails-list/available-trails-list.component';




@NgModule({
  declarations: [
    LoginComponent,
    AvailableTrailsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsRoutingModule,
    CoreModule,
  ],
  exports: [

    AvailableTrailsListComponent
  ]
})
export class ComponentModule { }
