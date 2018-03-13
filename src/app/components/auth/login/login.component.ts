import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Util } from "../../../helpers/util.helper";
import { Usuario } from './../../../models/usuario.model';

export interface UsuarioLoginInfo {
  unique:string,
  senha?:string,
  confirm_senha?:string,
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  usuario_info:UsuarioLoginInfo = <UsuarioLoginInfo>{ };
  title:string = 'Logar';
  register:boolean = false;
  usuario:any;

  loginForm = new FormGroup({
    unique: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    confirmsenha: new FormControl(''),
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.loginForm.get(input_name).hasError('required')) {
      if(input_name=='unique'){
        err_message = 'Obrigatório informar email.';
      }else{
        err_message = 'Obrigatório informar senha.';
      }
    }
    if(this.loginForm.get(input_name).hasError('custom')) {
      err_message = this.loginForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.loginForm.get(input_name).setErrors({custom: message});
  }

  constructor() { }

  ngOnInit() {
  }

  async onSubmit(){
    var data = {
      unique_key :this.usuario_info.unique,
      senha      :this.usuario_info.senha,
    };

    this.register===false ? this.login(data) : this.create(data);

    return;
  }

  onTryLogin(){
    this.register = false;
    this.title="Logar";
    let unique = this.usuario_info.unique;
    this.loginForm.reset({unique:unique});
    this.loginForm.setErrors(null);
  }

  async login(data: Object){
    var err;
    [err, this.usuario] = await Util.to(Usuario.LoginReg(data));
    if(err){
      if(err.message.includes('senha') || err.message.includes('senha')){
        this.throwInputError('senha', err.message);
      }else if(err.message === 'Not registered'){
        this.title = "Favor Registrar";
        this.register = true;
      }else if(err.message.includes('email')){
        this.throwInputError('unique', err.message);
      }else{
        this.throwInputError('unique', err.message);
      }

      return;
    }
    return Util.route('/home');
  }

  async create(data: Object){
    if(this.usuario_info.confirm_senha!=this.usuario_info.senha){
      this.throwInputError('confirmsenha', 'Senhas não são iguais!');
      return
    }

    let err;
    [err, this.usuario] = await Util.to(Usuario.CreateAccount(data))

    if(err) Util.TE(err);

    return Util.route('/home');
  }
}
