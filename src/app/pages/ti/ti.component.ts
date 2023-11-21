import { Component } from '@angular/core';

@Component({
  selector: 'app-ti',
  templateUrl: './ti.component.html',
  styleUrls: ['./ti.component.css']
})
export class TiComponent {
  people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 22 },
  ];

  sortKey: keyof typeof TiComponent.prototype.people[0] | null = null;

  sort(key: keyof typeof TiComponent.prototype.people[0]): void {
    this.sortKey = key;
    this.people.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  }
}


