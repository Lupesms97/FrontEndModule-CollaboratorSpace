import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.css']
})
export class TrailComponent {

  listLoadData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    setTimeout(() => {
      this.listLoadData.next(true);
    }, 2000);
  }

}
