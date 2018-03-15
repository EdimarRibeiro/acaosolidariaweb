import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produto }                            from './../../../models/produto.model';
import { MatSnackBar }                        from '@angular/material';
import { Util }                               from './../../../helpers/util.helper';

export interface ProdutoInfo {
  idproduto  :string,
  nome  :string,
}

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})

export class ProdutoCreateComponent implements OnInit {
  produto_info:ProdutoInfo =  {
    idproduto  :'',
    nome  :'',
  }

  constructor(public snackBar: MatSnackBar) { };

  produtoForm = new FormGroup({
    nome  : new FormControl('', [Validators.required]),
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.produtoForm.get(input_name).hasError('required')) err_message = 'Informe o nome da produto.';
    if(this.produtoForm.get(input_name).hasError('custom')) {
      err_message = this.produtoForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.produtoForm.get(input_name).setErrors({custom: message});
  }

  ngOnInit() {  
  }

  async onCancel(){
    Produto.to('list')
  }

  async onSubmit(){
    let err, produto;
    [err, produto] = await Util.to(Produto.CreateAPI(this.produto_info));
    
    if(err){
      if(err.message.includes('nome') || err.message.includes('None')){
        this.throwInputError('nome', err.message);
      }
    }
    else  
      Produto.to('list');
  }
}
