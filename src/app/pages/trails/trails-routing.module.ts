import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { TextComponent } from './text/text.component';
import { QuestionComponent } from './question/question.component';
import { TrailComponent } from './trail/trail.component';

const routes: Routes = [
  { path: '', redirectTo: 'trilha', pathMatch: 'full' },
  {path:'video', component: VideoComponent},
  {path:'text', component: TextComponent},
  {path:'question', component: QuestionComponent},
  {path:'trilha', component: TrailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrailsRoutingModule { }