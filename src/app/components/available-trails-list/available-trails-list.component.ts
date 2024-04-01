import { Component } from '@angular/core';
import { CourseService } from 'src/app/core/courses/course.service';
import { CourseResume } from 'src/app/shared/models/CourseResume';

@Component({
  selector: 'app-available-trails-list',
  templateUrl: './available-trails-list.component.html',
  styleUrls: ['./available-trails-list.component.css']
})
export class AvailableTrailsListComponent {
  percentage = 30;

  courses : CourseResume[] = [];

  constructor(
   private courseService: CourseService
  ) {
    this.courseService.getResumeCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

}
