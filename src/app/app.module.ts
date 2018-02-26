import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppBootstrapModule} from './appbootstrapmodule';
import { AppComponent, HomeComponent, HeaderComponent} from './components';
import { ConfigService } from './services';

import { AccountModule } from './components/account/account.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ConfigurationModule } from './components/configuration/configuration.module';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    AccountModule,
    DashboardModule,
    ConfigurationModule,
    BrowserModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
