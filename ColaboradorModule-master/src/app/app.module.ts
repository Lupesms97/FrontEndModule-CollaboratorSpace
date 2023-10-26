import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { ComponentModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    PagesModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    CoreModule
  ],
  providers: [AppModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
