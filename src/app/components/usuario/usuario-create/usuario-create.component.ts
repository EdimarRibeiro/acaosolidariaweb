import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario }                            from './../../../models/usuario.model';
import { MatSnackBar }                        from '@angular/material';
import { Util }                               from './../../../helpers/util.helper';

export interface UsuarioInfo {
  identidade:string,
  nome  :string,
  email :string,
  senha :string,
}

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})

export class UsuarioCreateComponent implements OnInit {
  usuario_info:UsuarioInfo =  {
    identidade  :'',    
    nome  :'',
    email :'',
    senha :'',
  }

  constructor(public snackBar: MatSnackBar) { };

  usuarioForm = new FormGroup({
    nome  : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required]),
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.usuarioForm.get(input_name).hasError('required')) err_message = 'Informe o nome da usuario.';
    if(this.usuarioForm.get(input_name).hasError('custom')) {
      err_message = this.usuarioForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.usuarioForm.get(input_name).setErrors({custom: message});
  }

  ngOnInit() {
  }

  async onSubmit(){
    let err, usuario;
    [err, usuario] = await Util.to(Usuario.CreateAccount(this.usuario_info));
    
    if(err){
      if(err.message.includes('nome') || err.message.includes('None')){
        this.throwInputError('nome', err.message);
      }
      if(err.message.includes('email') || err.message.includes('Email')){
        this.throwInputError('email', err.message);
      }
      if(err.message.includes('senha') || err.message.includes('Senha')){
        this.throwInputError('senha', err.message);
      }
    } 
    else  
      Usuario.to('list');
  }
}
