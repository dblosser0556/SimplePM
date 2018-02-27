import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastrService } from 'ngx-toastr';


export enum ToastrType {
  success,
  warning,
  info,
  show
}

@Injectable()
export class ErrorMsgService {

  private messageSource = new BehaviorSubject<string>('');

  currentMessage = this.messageSource.asObservable();

  constructor(private toast: ToastrService) { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  showUserMessage(_type: ToastrType, _title: string, _message: string, _disableTimeOut?: boolean,
    _timeOut?: number, _closeButton?: boolean) {
    const config  = {
      disableTimeOut: (_disableTimeOut) ? _disableTimeOut : false,
      timeOut: (_timeOut) ? _timeOut : 5000,
      closeButton: (_closeButton) ? _closeButton : false,
      positionClass: 'toast-top-right'
    };

    switch (_type) {
      case ToastrType.show:
        this.toast.show( _message, _title, config);
        break;
      case ToastrType.info:
        this.toast.info(_message, _title, config);
        break;
      case ToastrType.success:
        this.toast.success(_message, _title, config);
        break;
      case ToastrType.warning:
        this.toast.warning(_message, _title, config);
        break;
    }
  }

}
