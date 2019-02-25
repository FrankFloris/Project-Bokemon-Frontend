import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldViewComponent } from './world-view/world-view.component';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';
// import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LogoutComponent } from './logout/logout.component';
import {WorldviewGuardService} from './worldview-guard.service';
import { BattleViewComponent } from './battle-view/battle-view.component';
import { FormsModule } from '@angular/forms';
import { PlayerInfoComponent } from './player-info/player-info.component';


@NgModule({
  declarations: [
    AppComponent,
    WorldViewComponent,
    LoginPageComponent,
    SignupComponent,
    LogoutComponent,
    BattleViewComponent,
    PlayerInfoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [WorldviewGuardService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
