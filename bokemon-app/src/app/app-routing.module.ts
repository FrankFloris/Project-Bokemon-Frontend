import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldViewComponent} from './world-view/world-view.component';
import { LoginPageComponent} from './login-page/login-page.component';
import { SignupComponent} from './signup/signup.component';

const routes: Routes = [
  {path: 'login-page', component: LoginPageComponent},
  {path: 'world-view', component: WorldViewComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
