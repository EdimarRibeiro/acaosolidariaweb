import { Component, OnInit } from '@angular/core';
import { Entidade } from "./../../../models/entidade.model";

@Component({
  selector: 'app-entidade-list',
  templateUrl: './entidade-list.component.html',
  styleUrls: ['./entidade-list.component.css']
})

export class EntidadeListComponent implements OnInit {
  entidades:Array<Entidade> = [];
  constructor() { }

  async ngOnInit() {
    this.entidades = await Entidade.getAllAuthEntidades();
  }

}
