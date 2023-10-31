import { Component } from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {
// Variável para armazenar a data selecionada
formData: any = {};

onSubmit() {
  console.log('Formulário enviado:', this.formData);
  // Faça o que quiser com os dados do formulário aqui
}

}
