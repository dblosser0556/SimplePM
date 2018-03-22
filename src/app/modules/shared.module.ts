// include directives/components commonly used in features modules in this shared modules
// and import me into the feature module
// importing them individually results in: Type xxx is part
// of the declarations of 2 modules: ... Please consider
// moving to a higher module...
// https://github.com/angular/angular/issues/10646
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { myFocus } from '../directives/focus.directive';
import { ColspanDirective } from '../directives/colspan.directive';
import { MultiselectDirective } from '../directives/multiselect.directive';

import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';

import { ErrorMsgService, ConfigService, UserService} from '../services';
import { UtilityService } from '../services/utility.service';


@NgModule({
  imports:      [CommonModule, HttpClientModule, ToastrModule.forRoot(), BrowserAnimationsModule, ModalModule],
  declarations: [myFocus, ColspanDirective, SpinnerComponent, MultiselectDirective, ConfirmationComponent],
  entryComponents: [ConfirmationComponent],
  exports:      [myFocus, ColspanDirective, SpinnerComponent, MultiselectDirective, ConfirmationComponent],
  providers:    [ErrorMsgService, ConfigService, UserService, UtilityService]
})
export class SharedModule { }

