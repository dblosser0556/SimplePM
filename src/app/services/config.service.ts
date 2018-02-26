import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ConfigService {
  rootDataUrl = 'http://localhost:5000/api';
  _sidebarActive: boolean;

  // Observable navItem source
  private _authSideBarActiveStatus = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  sidebarActiveStatus$ = this._authSideBarActiveStatus.asObservable();

  constructor() {
    this._sidebarActive = false;
   }

   isSideBarActive() {
     return this._sidebarActive;
   }

   setSideBarActiveState(state: boolean) {
    this._sidebarActive = state;
    this._authSideBarActiveStatus.next(state);
   }
}
