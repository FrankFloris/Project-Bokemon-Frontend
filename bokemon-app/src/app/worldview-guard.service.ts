import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthGuardService} from './guards/auth-guard.service';

@Injectable()
export class WorldviewGuardService implements CanActivate {

  constructor (private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if ((localStorage.getItem("player")) == ''){
      this.router.navigate(['login-page']);
      return false;
    }
    else return true;
  }

}
