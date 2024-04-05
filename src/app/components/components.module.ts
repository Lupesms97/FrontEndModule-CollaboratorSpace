import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvailableTrailsListComponent } from './available-trails-list/available-trails-list.component';
import { CommonModule } from '@angular/common';
import { AvaliableTrailListDetailComponent } from './avaliable-trail-list-detail/avaliable-trail-list-detail.component';




@NgModule({
  declarations: [
    LoginComponent,
    AvailableTrailsListComponent,
    AvaliableTrailListDetailComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    LoginComponent,
    AvailableTrailsListComponent,
    AvaliableTrailListDetailComponent
  ]
})
export class ComponentModule { }
