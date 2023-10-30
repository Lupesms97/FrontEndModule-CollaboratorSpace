import { Component } from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {
  selectedDate: string = ''; // Variável para armazenar a data selecionada

  constructor() {}

  printTela(inf:string){
    console.log(inf);
  }
}
