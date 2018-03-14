import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute }         from "@angular/router";
import { Util }                   from "../../../helpers/util.helper";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar }            from '@angular/material';
import { Usuario }                from "./../../../models/usuario.model";

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  url_params;
  usuario:any = {
    idusuario  :'',
    identidade  :'',    
    nome  :'',
    email :'',
    senha :'',
  };

  usuarioForm = new FormGroup({
    nome  : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required]),
  });

  getInputErrorMessage(input_name:string){
    var err_message:string = '';
    if(this.usuarioForm.get(input_name).hasError('required')) err_message = 'Informe o conteúdo do campo.';
    if(this.usuarioForm.get(input_name).hasError('custom')) {
      err_message = this.usuarioForm.get(input_name).getError('custom');
    }

    return err_message;
  }

  throwInputError(input_name:string, message:string){
    this.usuarioForm.get(input_name).setErrors({custom: message});
  }

  constructor(private aRoute: ActivatedRoute, public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.usuario = await Usuario.getById(this.url_params.idusuario,this.url_params.identidade);
  }

  async onSubmit(){
    let err, res;
    [err, res] = await Util.to(this.usuario.saveAPI());

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
      if(err.message == 'Nothing Updated') this.snackBar.open('Usuario', 'Não foi alterada nenhum campo', {duration: 2000});

      return;
    }
    
    this.snackBar.open('Usuario', 'Os dados foram atualizados!!!!', {duration: 2000});
    return Usuario.to('list');
  }

  async onDelete(){
    let remove = await Util.openRemoveDialog({data:{title:'Warning', body:'Tem certeza que deseja apagar a usuario?'}});
    if(remove){
      let err, res;
      [err, res] = await Util.to(this.usuario.removeAPI());
      if(err){
        if(err.message == 'Nothing Updated') this.snackBar.open('Usuario', 'Não foi possível apagar o Usuário!', {duration: 2000});
        return;
      }

      return Usuario.to('list');
    }
  }
}
