import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entidade }                            from './../../../models/entidade.model';
import { MatSnackBar }                        from '@angular/material';
import { Util }                               from './../../../helpers/util.helper';

export interface EntidadeInfo {
  name:string,
}

@Component({
  selector: 'app-entidade-create',
  templateUrl: './entidade-create.component.html',
  styleUrls: ['./entidade-create.component.css']
})

export class EntidadeCreateComponent implements OnInit {
  entidade_info:EntidadeInfo = {name:''};
  constructor(public snackBar: MatSnackBar) { }

  entidadeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.entidadeForm.get(input_name).hasError('required')) err_message = 'Informe o nome da entidade.';
    if(this.entidadeForm.get(input_name).hasError('custom')) {
      err_message = this.entidadeForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  ngOnInit() {
  }

  async onSubmit(){
    let err, entidade;
    [err, entidade] = await Util.to(Entidade.CreateAPI(this.entidade_info));
    entidade.to('list');
  }

}
