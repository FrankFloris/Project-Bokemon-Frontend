import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class WorldviewGuardService implements CanActivate {

  constructor (
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (this.authenticationService.currentPlayer) {
      return true;
    }

    this.router.navigate(['login-page']);
    return false;
  }

}
