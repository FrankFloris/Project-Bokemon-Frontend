import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldViewComponent} from './world-view/world-view.component';
import { LoginPageComponent} from './login-page/login-page.component';
import { SignupComponent} from './signup/signup.component';
import {WorldviewGuardService} from './worldview-guard.service';
import {BattleViewComponent} from './battle-view/battle-view.component';



const routes: Routes = [
  {path: 'login-page', component: LoginPageComponent},
  {path: 'world-view', component: WorldViewComponent, canActivate: [WorldviewGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'battle-view', component: BattleViewComponent},
  {path: '', component: LoginPageComponent},
  {path: '**', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
