import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute }         from "@angular/router";
import { Util }                   from "../../../helpers/util.helper";
import { Entidade }                from "./../../../models/entidade.model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar }            from '@angular/material';

@Component({
  selector: 'app-entidade-update',
  templateUrl: './entidade-update.component.html',
  styleUrls: ['./entidade-update.component.css']
})
export class EntidadeUpdateComponent implements OnInit {

  url_params;
  entidade:any = {
    identidade  :'',
    nome  :'',
    cnpj  :'',
    email :'',
    senha :'',
    telef :'',
    lougra:'',
    numero:'',
    compl :'',
    cidade:'',
    bairro:'',
    cep   :'',
    estado:'',
  };

  entidadeForm = new FormGroup({
    nome  : new FormControl('', [Validators.required]),
    cnpj  : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    telef : new FormControl('', [Validators.required]),
    lougra: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    compl : new FormControl('', []),
    cidade: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cep   : new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.entidadeForm.get(input_name).hasError('required')) err_message = 'Informe o conteúdo do campo.';
    if(this.entidadeForm.get(input_name).hasError('custom')) {
      err_message = this.entidadeForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.entidadeForm.get(input_name).setErrors({custom: message});
  }

  constructor(private aRoute: ActivatedRoute, public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.entidade = await Entidade.getById(this.url_params.identidade);

  }

  async onSubmit(){
    let err, res;
    [err, res] = await Util.to(this.entidade.saveAPI());

    if(err){
      if(err.message.includes('nome') || err.message.includes('None')){
        this.throwInputError('nome', err.message);
      }
      if(err.message.includes('cnpj') || err.message.includes('Cnpj')){
        this.throwInputError('cnpj', err.message);
      }

      if(err.message.includes('telef') || err.message.includes('Telefone')){
        this.throwInputError('telef', err.message);
      }
      
      if(err.message.includes('lougra') || err.message.includes('Endereço')){
        this.throwInputError('lougra', err.message);
      }

      if(err.message.includes('numero') || err.message.includes('Número')){
        this.throwInputError('numero', err.message);
      }

      if(err.message.includes('compl') || err.message.includes('Complemento')){
        this.throwInputError('compl', err.message);
      }

      if(err.message.includes('bairro') || err.message.includes('Bairro')){
        this.throwInputError('bairro', err.message);
      }

      if(err.message.includes('cidade') || err.message.includes('Cidade')){
        this.throwInputError('cidade', err.message);
      }

      if(err.message.includes('estado') || err.message.includes('Estado')){
        this.throwInputError('estado', err.message);
      }

      if(err.message.includes('cep') || err.message.includes('Cep')){
        this.throwInputError('cep', err.message);
      }

      if(err.message.includes('email') || err.message.includes('Email')){
        this.throwInputError('email', err.message);
      }

      if(err.message == 'Nothing Updated') this.snackBar.open('Entidade', 'Não foi alterada nenhum campo', {duration: 2000});

      return;
    }
    
    this.snackBar.open('Entidade', 'Os dados foram atualizados!!!!', {duration: 2000});
    return Entidade.to('list');
  }

  async onDelete(){
    let remove = await Util.openRemoveDialog({data:{title:'Warning', body:'Tem certeza que deseja apagar a entidade?'}});
    if(remove){
      let err, res;
      [err, res] = await Util.to(this.entidade.removeAPI());
      if(err){
        console.log(err, 'err')
        if(err.message == 'Nothing Updated') this.snackBar.open('Entidade', 'Nothing to Update', {duration: 2000});
        return;
      }

      return Entidade.to('list');
    }
  }
}
