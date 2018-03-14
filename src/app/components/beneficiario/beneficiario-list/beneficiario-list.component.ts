import { Component, OnInit } from '@angular/core';
import { Beneficiario } from "./../../../models/beneficiario.model";

@Component({
  selector: 'app-beneficiario-list',
  templateUrl: './beneficiario-list.component.html',
  styleUrls: ['./beneficiario-list.component.css']
})

export class BeneficiarioListComponent implements OnInit {
  beneficiarios:Array<Beneficiario> = [];
  constructor() { }

  async ngOnInit() {
    this.beneficiarios = await Beneficiario.getAllAuthBeneficiarios();
  }

}
