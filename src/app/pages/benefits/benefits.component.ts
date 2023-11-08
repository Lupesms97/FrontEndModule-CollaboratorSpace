import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent {
  showTextTooth:boolean = false;
  showTextMedice:boolean = false;

  showTextToothFunc(){
    
    this.showTextTooth = !this.showTextTooth;
    

  }

  showTextMediceFunc(){
    
    this.showTextMedice = !this.showTextMedice;

  }


}
