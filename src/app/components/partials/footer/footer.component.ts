import { Component, OnInit } from '@angular/core';
import { Util } from '../../../helpers/util.helper';
import { Usuario } from '../../../models/usuario.model';

export interface FooterLinks {
  header: string;
  links: [{
    name: string;
    route: string;
  }];
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  date: number = new Date().getFullYear();
  env;
  usuario: Usuario;

  // Refers to interface in case footer links are specialized for each usuario
  // this is all hard coded data. can be pulled from a db/usuario specific
  footer_links: Array<FooterLinks> = [
    {
      header: 'Informações',
      links: [
        {name: 'Inicio', route: 'home'},
        {name: 'Logar', route: 'login'}
        ]
    }/*,
    {
      header: 'Contact',
      links: [
        {name: 'Email', route: 'home'},
        {name: 'Call', route: 'login'},
        {name: 'Locations', route: 'usuario/register'}
        ]
    },
    {
      header: 'About',
      links: [
        {name: 'Our Mission', route: 'home'},
        {name: 'Our Story', route: 'login'},
        {name: 'Our People', route: 'home'}
        ]
    }*/
    ];

  constructor() { }

  ngOnInit() {
    this.usuario = Usuario.Auth();
    this.env = Util.env;
    Usuario.on(['auth', 'saveApi'], (auth_state) => { // data will be different depending on which event was emitted
      console.log('the usuario has:', auth_state);
      this.usuario = Usuario.Auth();
      // we can dynamically make the view check on cvertain events. For large apps this is very efficient
    });
    }
}
