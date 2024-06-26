import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { TextComponent } from './text/text.component';
import { TrailComponent } from './trail/trail.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', redirectTo: 'trilha', pathMatch: 'full' },
  {path:'video', component: VideoComponent},
  {path:'text', component: TextComponent},
  {path:'question', component: QuizComponent},
  {path:'trilha', component: TrailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailsRoutingModule {
  constructor(private readonly router: Router) {
    this.router.config.unshift({
      path: 'trilhas-disponiveis/:nomeDaTrilha',
      children: routes // Fix: Pass routes as a single route object
    });
  }
}
