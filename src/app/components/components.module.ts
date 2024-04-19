import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvailableTrailsListComponent } from './available-trails-list/available-trails-list.component';
import { CommonModule } from '@angular/common';
import { HeaderTrailListDetailComponent } from './header-trail-list-detail/header-trail-list-detail.component';
import { ListDetailedTrailComponent } from './list-detailed-trail/list-detailed-trail.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [
    LoginComponent,
    AvailableTrailsListComponent,
    HeaderTrailListDetailComponent,
    ListDetailedTrailComponent,
    VideoPlayerComponent,
    QuestionComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    YouTubePlayerModule
  ],
  exports: [
    LoginComponent,
    AvailableTrailsListComponent,
    HeaderTrailListDetailComponent,
    ListDetailedTrailComponent, 
    VideoPlayerComponent,
    QuestionComponent
  ]
})
export class ComponentModule { }
