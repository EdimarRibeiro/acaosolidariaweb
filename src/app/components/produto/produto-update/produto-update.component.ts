import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute }         from "@angular/router";
import { Util }                   from "../../../helpers/util.helper";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar }            from '@angular/material';
import { Produto }                from "./../../../models/produto.model";

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  url_params;
  produto:any = {
    idproduto  :'',
    nome  :'',
  };

  produtoForm = new FormGroup({
    nome  : new FormControl('', [Validators.required]),
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.produtoForm.get(input_name).hasError('required')) err_message = 'Informe o conteúdo do campo.';
    if(this.produtoForm.get(input_name).hasError('custom')) {
      err_message = this.produtoForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.produtoForm.get(input_name).setErrors({custom: message});
  }

  constructor(private aRoute: ActivatedRoute, public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.produto = await Produto.getById(this.url_params.idproduto);
  }

  async onCancel(){
    Produto.to('list')
  }
  
  async onSubmit(){
    let err, res;
    [err, res] = await Util.to(this.produto.saveAPI());

    if(err){
      if(err.message.includes('nome') || err.message.includes('None')){
        this.throwInputError('nome', err.message);
      }

      if(err.message == 'Nothing Updated') this.snackBar.open('Produto', 'Não foi alterada nenhum campo', {duration: 2000});

      return;
    }
       
    this.snackBar.open('Produto', 'Os dados foram atualizados!!!!', {duration: 2000});
    return Produto.to('list');
  }

  async onDelete(){
    let remove = await Util.openRemoveDialog({data:{title:'Warning', body:'Tem certeza que deseja apagar a produto?'}});
    if(remove){
      let err, res;
      [err, res] = await Util.to(this.produto.removeAPI());
      if(err){
        if(err.message == 'Nothing Updated') this.snackBar.open('Produto', 'Não foi possível apagar!', {duration: 2000});
        return;
      }

      return Produto.to('list');
    }
  }
}
