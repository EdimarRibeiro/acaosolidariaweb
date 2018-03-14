import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Usuario }    from './../models/usuario.model';
import { Util }       from './../helpers/util.helper';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(){}
  canActivate(): boolean {
    if(Usuario.Auth()){
      return true;
    }else{
      Util.route('/home');
      return false;
    }
  }
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //     return this.userService.loggedIn();
  // }
}
