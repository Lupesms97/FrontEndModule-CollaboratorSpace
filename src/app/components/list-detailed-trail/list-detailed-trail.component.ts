import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
}
