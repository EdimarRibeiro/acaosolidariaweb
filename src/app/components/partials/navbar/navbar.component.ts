import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Util } from '../../../helpers/util.helper';
import { Usuario } from '../../../models/usuario.model';
import {Entidade} from "../../../models/entidade.model";

export interface NavLinks {
  route?: string;
  name: string;
  sub_links?: Array <NavLinks>; // In case of nested dropdowns
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // this means it is not active checking for data changes
})

export class NavbarComponent implements OnInit {
  usuario: Usuario;
  env;
  nav_links_usuario: Array<NavLinks> = [
    {route: 'usuario/list', name: 'Beneficiário'},
    {route: 'coleta/list' , name: 'Coleta'},
    {route: 'produto/list'  , name: 'Produto'},
    {route: 'usuario/list'  , name: 'Usuário'},    
    {route: 'entidade/list'   , name: 'Entidades'}
  ];
  nav_links_no_usuario: Array<NavLinks> = [
    {route: 'home', name: 'Ação Solidária'},
    {route: 'login', name: 'Logar'},
    {route: 'register', name: 'Registar'}
  ];

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.usuario = Usuario.Auth();
    this.env = Util.env;
    // I am intentionally over complicating this here to show how useful this can become in a large app
    Usuario.on(['auth', 'saveApi'], (auth_state) => {// data will be different depending on which event was emitted
      //console.log('the usuario has:', auth_state);
      this.usuario = Usuario.Auth();
      // we can dynamically make the view check on certain events. For large apps this is very efficient
      this.cd.markForCheck(); // this makes the view check for updates once
    });
  }

  onLogout(){
    if(Usuario.Auth()) this.usuario.logout();
  }

}
