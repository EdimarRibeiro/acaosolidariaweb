import { Component, OnInit }      from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Util }                   from "../../../helpers/util.helper";
import { Entidade }                from './../../../models/entidade.model';
import { MatSnackBar }            from '@angular/material';


export interface EntidadeInfo {
  nome  :string,
  cnpj  :string,
  email :string,
  senha :string,
  telef :string,
  lougra:string,
  numero:string,
  compl :string,
  cidade:string,
  bairro:string,
  cep   :string,
  estado:string,
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  entidade:EntidadeInfo = {
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

  profileForm = new FormGroup({
    nome  : new FormControl('', [Validators.required]),
    cnpj  : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required]),    
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
    if(this.profileForm.get(input_name).hasError('required')) err_message = 'Obrigatório informar o campo.';
    if(this.profileForm.get(input_name).hasError('custom')) {
      err_message = this.profileForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.profileForm.get(input_name).setErrors({custom: message});
  }

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    //if(Entidade.Auth()) this.entidade.reload(); //makes sure if values arent saved other components arent updated
  }

  async onSubmit(){
    let err, res;
    [err, res] = await Util.to(Entidade.CreateAPI(this.entidade));

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

      if(err.message.includes('senha') || err.message.includes('Senha')){
        this.throwInputError('senha', err.message);
      }

      if(err.message == 'Nothing Updated') this.snackBar.open('Entidade', 'Nothing to Update', {duration: 2000});
        return;
    }

    this.snackBar.open('Entidade', 'Successfully Updated', {duration: 2000});
    
    return Util.route('/login');
  }

}
