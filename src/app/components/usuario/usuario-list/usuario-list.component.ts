import { Component, OnInit } from '@angular/core';
import { Usuario } from "./../../../models/usuario.model";

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})

export class UsuarioListComponent implements OnInit {
  usuarios:Array<Usuario> = [];
  constructor() { }

  async ngOnInit() {
    this.usuarios = await Usuario.getAllAuthUsuarios();
  }

}
