import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailService } from 'src/app/core/trail/trails.service';
import { TrailsResume } from 'src/app/shared/models/TrailsResume';

@Component({
  selector: 'app-header-trail-list-detail',
  templateUrl: './header-trail-list-detail.component.html',
  styleUrls: ['./header-trail-list-detail.component.css']
})
export class HeaderTrailListDetailComponent  implements OnInit, OnDestroy{


  private router = inject(ActivatedRoute);
  private trailService = inject(TrailService);
  public nomeDaTrilha: string = '';

  public trailDetailed: TrailsResume = {} as TrailsResume;

  constructor() {}

  ngOnInit(): void {
    this.trailService.getTrailOnDetils().subscribe((trail) => {
      this.trailDetailed = trail;
    });

  }
  getIcon(course: TrailsResume): string {
    switch (course.department) {
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

  ngOnDestroy(): void {
/*     this.trailService.cleanTrailOnDetils();
 */  }
}

