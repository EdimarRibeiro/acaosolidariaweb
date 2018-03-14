import { Model }            from 'browser-model';
import * as _               from 'underscore';
import { API }              from './../helpers/api.helper';
import { Util }             from './../helpers/util.helper';
import { LoginOptions }     from 'ngx-facebook';
import * as jwt_decode      from 'jwt-decode';
//interfaces
import { LoginInfo }        from './../interfaces/login-info';

export class Usuario extends Model {
  apiUpdateValues:Array<string> = ['nome', 'email', 'senha'];//these are the values that will be sent to the API

  idusuario;
  identidade;
  nome;
  auth;
  token;
  email;
  senha;

  static SCHEMA = {
    idusuario:{type:'string', primary:true},//this means every time you make a new object you must give it a _id
    identidade:{type:'string'},
    nome:{type:'string'},
    email:{type:'string'},
    senha:{type:'string'},
    auth:{type:'boolean'},
    token:{type:'string'},
  };

  constructor(obj:object){
    super(obj);
  }

  logout(){
    this.remove();
    localStorage.clear();//remove all data in storage
    Util.route('/home');
    this.emit(['logout', 'auth'], 'logout', true);
  }
 
  to(action){
    return Util.route('/usuario/'+action+'/'+this.identidade+'/'+this.idusuario);
  }

  async saveAPI(){
    return API.save(this, '/v1/usuario/'+this.idusuario);
  }

  async removeAPI(){
    return API.remove(this, '/v1/usuario/'+this.idusuario);
  }

  parseToken(){
    return jwt_decode(this.token);
  }

  //************************************
  //********* STATIC METHODS ***********
  //************************************
  static to(action){
    return Util.route('/usuario/'+action);
  }

  static get fb(){
    // return Util.fb;
    return {};
  }

  static Auth(){//Grabs currently authenticated usuario
    let usuario:Usuario = <Usuario> this.findOne({auth:true});
    if(usuario){
      let parse = usuario.parseToken();

      let cur_time_date = new Date();
      let cur_time = cur_time_date.getTime()/1000;

      if(cur_time>=parse.exp){//get the usuarios token expiration time if it is up log them out
        usuario.logout()
        return null;
      }
    }

    return usuario;
  }

  static Login(info: LoginInfo){

    let usuario_info:any = info.usuario;

    usuario_info.auth  = true;
    usuario_info.token = info.token;

    let usuario = <Usuario> Usuario.create(usuario_info);

    usuario.emit(['login', 'auth'], 'login', true);
    return usuario;
  }

  static async LoginReg(data: Object){
    let res:any;
    let err;
    
    [err, res] = await Util.to(Util.post('/v1/usuario/login', data));

    if(err) Util.TE(err, true);

    if(!res.success) Util.TE(res.error, true);

    var login_info: LoginInfo = {
      token: res.token,
      usuario: res.usuario,
    };

    let usuario = this.Login(login_info);

    return usuario;
  }

  static async CreateAccount(data:any){
    let err, res:any;
    let login:Usuario = <Usuario> this.findOne({auth:true});
    data.identidade = login.identidade;

    [err, res] = await Util.to(Util.post('/v1/usuario', data));

    if(err) Util.TE(err, true);
    if(!res.success) Util.TE(res.error, true);

    var login_info: LoginInfo = {
      token: res.token,
      usuario: res.usuario,
    };

    //let usuario = this.Login(login_info);
    let usuario = this.resCreate(res.usuario);; 
    return usuario;
  }

  static async getAllAuthUsuarios(){
    let err, res;

    let login:Usuario = <Usuario> this.findOne({auth:true});

    [err, res] = await Util.to(Util.get('/v1/usuario/'+login.identidade));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let usuarios = []
    for(let i in res.usuario){
      let usuario_info = res.usuario[i];
      let usuario = this.resCreate(usuario_info);

      usuarios.push(usuario);
    }

    return usuarios;
  }

  static async getById(idusuario:string,identidade:string){
    let usuario = this.findById(idusuario);
    if(usuario) return usuario;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/v1/usuario/'+identidade+'/'+idusuario));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let usuario_info = res.usuario;
    usuario = this.resCreate(usuario_info);    
    return usuario;
  }

  static resCreate(res_usuario){//create usuario instance from a usuario response
    let usuario = this.findById(res_usuario.idusuario);
    if(usuario) return usuario;
    let usuario_info = res_usuario;
    usuario_info.idusuario = res_usuario.idusuario;

    usuario = this.create(usuario_info);
    return usuario;
  }

  // static async LoginSocial(service: String){
  //   let err, res;
  //   let login_info: LoginInfo
  //   switch(service){
  //     case 'facebook':
  //       // const scopes = 'public_profile,usuario_friends,email,pages_show_list';
  //       const scopes = 'public_profile,usuario_friends,email,usuario_birthday';
  //       const loginOptions: LoginOptions = {
  //         enable_profile_selector: true,
  //         return_scopes: true,
  //         scope: scopes
  //       };
  //       [err, res] = await Util.to(this.fb.login(loginOptions));
  //
  //       let a_res = res.authResponse;
  //       [err, res] = await Util.to(this.fb.api('/me'+'?fields=id,name,picture,email,birthday,gender,age_range,devices,location,first_name,last_name,website'));
  //       [err ,res] = await Util.to(Util.post('/v1/social-auth/facebook', {auth_response:a_res, usuario_info:res}));
  //
  //       if(res.success == false){
  //         err = res.error
  //       }
  //       if(err) Util.TE(err, true);
  //       login_info = {
  //         token:res.token,
  //         usuario:res.usuario
  //       }
  //
  //       break;
  //     case  'google':
  //       err = 'google login not setup';
  //       break;
  //     default:
  //       err = 'no auth login service selected';
  //       break;
  //   }
  //
  //   let usuario;
  //   if(!err) usuario = this.Login(login_info);
  //
  //   if(!usuario) Util.TE('Error loggin usuario in', true);
  //   return usuario
  // }

}
