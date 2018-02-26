import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import { TabsModule  } from 'ngx-bootstrap/tabs';
@NgModule({
    imports: [

      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      AlertModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot()
    ],
    exports: [
      BsDropdownModule,
      TooltipModule,
      ModalModule,
      AlertModule,
      BsDatepickerModule,
      TabsModule
    ]

  })
  export class AppBootstrapModule {}
