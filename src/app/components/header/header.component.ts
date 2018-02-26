import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, ConfigService } from '../../services';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  status: boolean;
  sideBarActive: boolean;
  subLoginStatus: Subscription;
  userName: string;

  constructor(private user: UserService, private config: ConfigService) { }

  ngOnInit( ) {
    this.subLoginStatus = this.user.authNavStatus$.subscribe(
      status => this.status = status);
    
    this.sideBarActive = false;
  }

  logout() {
    this.user.logOut();
  }

  ngOnDestroy( ) {
    this.subLoginStatus.unsubscribe();
  }

  setSideBarActiveStatus() {
    this.sideBarActive = !this.sideBarActive;
    this.config.setSideBarActiveState(this.sideBarActive);
    console.log(this.sideBarActive.valueOf());
  }

}
