import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailsRoutingModule } from './trails-routing.module';
import { FormsModule } from '@angular/forms';
import { VideoComponent } from './video/video.component';
import { TextComponent } from './text/text.component';
import { TrailComponent } from './trail/trail.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ComponentModule } from 'src/app/components/components.module';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
    declarations: [
        VideoComponent,
        TextComponent,
        TrailComponent,
        QuizComponent
    ],
    exports: [TrailComponent],
    imports: [
        CommonModule,
        TrailsRoutingModule,
        FormsModule,
        NavbarComponent,
        ComponentModule,
        
    ]
})
export class TrailsModule { }
