import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { PublisherComponent } from './publisher/publisher.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { hasRole } from '../core/auth/guards/has-role.guard';
import { Role } from '../shared/models/Role';
import { authGuard } from '../core/auth/guards/auth.guard';


const routes: Routes = [
{ path:'', redirectTo: 'start', pathMatch: 'full' },
{ path: 'blog', component: BlogComponent , canActivate: [authGuard]   }, 
{ path: 'posts/:id', component: BlogDetailsComponent, canActivate: [authGuard] }, 
{ path: 'publisher', component: PublisherComponent  , canActivate: [authGuard] },

/* { path: 'posts/:id', component: BlogDetailsComponent, canActivate: [authGuard, hasRole], data: { role: [Role.ADMIN, Role.USER] } }, 
 */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }