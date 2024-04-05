import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrailService } from 'src/app/core/trail/trails.service';
import { TrailsResume } from 'src/app/shared/models/TrailsResume';

@Component({
  selector: 'app-available-trails-list',
  templateUrl: './available-trails-list.component.html',
  styleUrls: ['./available-trails-list.component.css']
})
export class AvailableTrailsListComponent {
  percentage = 30;

  trails: TrailsResume[] = [];

  constructor(
    private trailService: TrailService,
    private router: Router
  ) {
    this.trailService.getResumeTrails().subscribe((trails) => {
      this.trails = trails;
    });
  }

  goToCourseTrail(course: TrailsResume) {
    let nameLowerCase = course.name.toLowerCase();
    this.router.navigate([`/trilha/${nameLowerCase}/text`]);
  }

  getIcon(course: TrailsResume): string {
    switch (course.about) {
      case 'Sales':
        return 'bi bi-cash-coin';
      case 'Marketing':
        return 'bi bi-megaphone';
      case 'Development':
        return 'bi bi-signpost-2-fill';
      case 'On Boarding':
        return 'bi bi-people';
      case 'Customer Success':
        return 'bi bi-compass';
      default:
        return 'bi bi-code';
    }
  }

  setTrailDetail(identifier: string) {
   this.trailService.setOnDetalis(identifier);
  }
}
