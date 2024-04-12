import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrailDetailed } from 'src/app/shared/models/TrailDetailed';
import { TrailDetailedData } from 'src/app/shared/models/TrailDetailedInfo';

@Component({
  selector: 'app-list-detailed-trail',
  templateUrl: './list-detailed-trail.component.html',
  styleUrls: ['./list-detailed-trail.component.css']
})
export class ListDetailedTrailComponent {

  selectedTrail: string = '';

  constructor(
    private nameRouter: ActivatedRoute, 
    private router: Router
  ) {

    this.selectedTrail = this.nameRouter.snapshot.params['nomeDaTrilha'];
   }

   goTo(type:string){
      this.router.navigate([`/trilhas-disponiveis/${this.selectedTrail}/${type}`]);
   }

   getIcon(course: TrailDetailedData): string {
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
}
