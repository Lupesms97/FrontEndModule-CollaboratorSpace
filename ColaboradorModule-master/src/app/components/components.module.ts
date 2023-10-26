import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components-routing.module';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { userState } from '../core/store/loadUser.reducer';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsRoutingModule,
    CoreModule,
    PagesModule,
    StoreModule.forFeature('user', userState)
  ],
  exports: [
    
  ]
})
export class ComponentModule { }
