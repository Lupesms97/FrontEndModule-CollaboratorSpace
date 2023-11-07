import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService,
  ) {

   }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  showError() {
    this.toastr.error('Hello world!', 'Toastr fun!');
  }



  showToast(type:TypeToast, title:string, message:string){
    
      let options:Partial<IndividualConfig<any>> ={
        closeButton: true,
        tapToDismiss: true,
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
      }
    switch(type){
      case TypeToast.Success:
        this.toastr.success(message, title, options);
        break;
      case TypeToast.Error:
        this.toastr.error(message, title, options);
        break;
      case TypeToast.Warning:
        this.toastr.warning(message, title, options);
        break;
      case TypeToast.Info:
        this.toastr.info(message, title, options);
        break;
    }

  }
}
