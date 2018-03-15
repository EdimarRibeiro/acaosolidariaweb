import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Beneficiario }                            from './../../../models/beneficiario.model';
import { MatSnackBar }                        from '@angular/material';
import { Util }                               from './../../../helpers/util.helper';

export interface BeneficiarioInfo {
  idbeneficiario  :string,
  nome  :string,
  cpf   :string,
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
  datanasc:string,
}

@Component({
  selector: 'app-beneficiario-create',
  templateUrl: './beneficiario-create.component.html',
  styleUrls: ['./beneficiario-create.component.css']
})

export class BeneficiarioCreateComponent implements OnInit {
  beneficiario_info:BeneficiarioInfo =  {
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
  }

  constructor(public snackBar: MatSnackBar) { };

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
    if(this.beneficiarioForm.get(input_name).hasError('required')) err_message = 'Informe o nome da beneficiario.';
    if(this.beneficiarioForm.get(input_name).hasError('custom')) {
      err_message = this.beneficiarioForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.beneficiarioForm.get(input_name).setErrors({custom: message});
  }

  ngOnInit() {  
  }

  async onCancel(){
    Beneficiario.to('list')
  }

  async onSubmit(){
    let err, beneficiario;
    [err, beneficiario] = await Util.to(Beneficiario.CreateAPI(this.beneficiario_info));
    
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
    }
    else  
      Beneficiario.to('list');
  }
}
