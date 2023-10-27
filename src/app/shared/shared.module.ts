import { ApplicationRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from '../pages/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    FooterComponent,
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports:[
    FooterComponent
  ]
})
export class SharedModule { }
