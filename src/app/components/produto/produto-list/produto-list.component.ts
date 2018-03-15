import { Component, OnInit } from '@angular/core';
import { Produto } from "./../../../models/produto.model";

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})

export class ProdutoListComponent implements OnInit {
  produtos:Array<Produto> = [];
  constructor() { }

  async ngOnInit() {
    this.produtos = await Produto.getAllAuthProdutos();
  }

}
