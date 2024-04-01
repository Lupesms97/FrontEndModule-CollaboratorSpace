import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { PublisherComponent } from './publisher/publisher.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { Role } from '../shared/models/Role';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { TiComponent } from './ti/ti.component';
import { AvailableTrailsComponent } from './available-trails/available-trails.component';


const routes: Routes = [
{ path:'', redirectTo: 'news', pathMatch: 'full' },
{ path: 'news', component: BlogComponent /* , canActivate: [loggedGuard, hasRequiredRoleGuard], data: { role: [Role.ADMIN, Role.USER] } */  }, 
{ path: 'posts/:id', component: BlogDetailsComponent/* , canActivate: [loggedGuard, hasRequiredRoleGuard], data: { role: [Role.ADMIN, Role.USER] } */  }, 
{ path: 'publisher', component: PublisherComponent /* , canActivate: [loggedGuard, hasRequiredRoleGuard], data: { role: [Role.ADMIN, Role.USER] } */  }, 
{path:'calendar', component: CalendarComponent/* , canActivate: [loggedGuard, hasRequiredRoleGuard], data: { role: [Role.ADMIN, Role.USER] } */  }, 
{path:'userProfile', component: ProfileComponent/* , canActivate: [loggedGuard, hasRequiredRoleGuard], data: { role: [Role.ADMIN, Role.USER] } */  }, 
{path:'benefits', component: BenefitsComponent/* , canActivate: [loggedGuard, hasRequiredRoleGuard], data: { role: [Role.ADMIN, Role.USER] } */  },
{path:'trilhas-disponiveis', component: AvailableTrailsComponent/* , canActivate: [loggedGuard, hasRequiredRoleGuard], data: { role: [Role.ADMIN, Role.USER] } */  },
{path:'ti', component: TiComponent},
{ path: '**', redirectTo: 'news' } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
