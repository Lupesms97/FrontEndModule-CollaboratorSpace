import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { PublisherComponent } from './publisher/publisher.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { hasRole } from '../core/auth/guards/has-role.guard';
import { Role } from '../shared/models/Role';
import { authGuard } from '../core/auth/guards/auth.guard';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
{ path:'', redirectTo: 'blog', pathMatch: 'full' },
{ path: 'blog', component: BlogComponent /* , canActivate: [authGuard, hasRole], data: { role: [Role.ADMIN, Role.USER] } */  }, 
{ path: 'posts/:id', component: BlogDetailsComponent/* , canActivate: [authGuard, hasRole], data: { role: [Role.ADMIN, Role.USER] } */}, 
{ path: 'publisher', component: PublisherComponent  /* , canActivate: [authGuard, hasRole], data: { role: [Role.ADMIN] } */  },
{path:'edit/:id', component:PostEditComponent/* , canActivate: [authGuard, hasRole], data: { role: [Role.ADMIN] } */  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
