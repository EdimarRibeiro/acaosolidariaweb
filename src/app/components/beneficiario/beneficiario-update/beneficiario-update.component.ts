import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute }         from "@angular/router";
import { Util }                   from "../../../helpers/util.helper";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar }            from '@angular/material';
import { Beneficiario }                from "./../../../models/beneficiario.model";

@Component({
  selector: 'app-beneficiario-update',
  templateUrl: './beneficiario-update.component.html',
  styleUrls: ['./beneficiario-update.component.css']
})
export class BeneficiarioUpdateComponent implements OnInit {

  url_params;
  beneficiario:any = {
    idbeneficiario  :'',
    nome  :'',
    cpf   :'',
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
    datanasc:'',
  };

  beneficiarioForm = new FormGroup({
    nome  : new FormControl('', [Validators.required]),
    cpf   : new FormControl('', [Validators.required]),
    email : new FormControl('', []),
    telef : new FormControl('', [Validators.required]),
    lougra: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    compl : new FormControl('', []),
    cidade: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cep   : new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    datanasc: new FormControl('', [Validators.required]),    
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.beneficiarioForm.get(input_name).hasError('required')) err_message = 'Informe o conteúdo do campo.';
    if(this.beneficiarioForm.get(input_name).hasError('custom')) {
      err_message = this.beneficiarioForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.beneficiarioForm.get(input_name).setErrors({custom: message});
  }

  constructor(private aRoute: ActivatedRoute, public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.beneficiario = await Beneficiario.getById(this.url_params.idbeneficiario);
  }

  async onSubmit(){
    let err, res;
    [err, res] = await Util.to(this.beneficiario.saveAPI());

    if(err){
      if(err.message.includes('nome') || err.message.includes('None')){
        this.throwInputError('nome', err.message);
      }
      if(err.message.includes('cpf') || err.message.includes('CPF')){
        this.throwInputError('cpf', err.message);
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

      if(err.message.includes('datanasc') || err.message.includes('Datanasc')){
        this.throwInputError('datanasc', err.message);
      }

      if(err.message == 'Nothing Updated') this.snackBar.open('Beneficiario', 'Não foi alterada nenhum campo', {duration: 2000});

      return;
    }
       
    this.snackBar.open('Beneficiario', 'Os dados foram atualizados!!!!', {duration: 2000});
    return Beneficiario.to('list');
  }

  async onDelete(){
    let remove = await Util.openRemoveDialog({data:{title:'Warning', body:'Tem certeza que deseja apagar a beneficiario?'}});
    if(remove){
      let err, res;
      [err, res] = await Util.to(this.beneficiario.removeAPI());
      if(err){
        if(err.message == 'Nothing Updated') this.snackBar.open('Beneficiario', 'Não foi possível apagar o Usuário!', {duration: 2000});
        return;
      }

      return Beneficiario.to('list');
    }
  }
}
