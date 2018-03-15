import { Model }     from 'browser-model';
import * as _        from 'underscore';
import { API }       from './../helpers/api.helper';
import { Util }      from './../helpers/util.helper';
import { Usuario }   from './usuario.model';

export class Beneficiario extends Model {
  apiUpdateValues:Array<string> = ['nome', 'email','cpf','telef','lougra','numero','compl','cidade','bairro','cep','estado','datanasc'];//these are the values that will be sent to the API

  idbeneficiario;
  nome;

  static SCHEMA = {
    idbeneficiario:{type:'string', primary:true},//this means every time you make a new object you must give it a _id
    nome  :{type:'string'},
    cpf   :{type:'string'},
    email :{type:'string'},
    telef :{type:'string'},
    lougra:{type:'string'},
    numero:{type:'string'},
    compl :{type:'string'},
    cidade:{type:'string'},
    bairro:{type:'string'},
    cep   :{type:'string'},
    estado:{type:'string'},
    datanasc:{type:'date'},
  };

  constructor(obj:object){
    super(obj);
  }

  to(action){
    return Util.route('/beneficiario/'+action+'/'+this.idbeneficiario);
  }

  async saveAPI(){
    return API.save(this, '/v1/beneficiario/'+this.idbeneficiario);
  }

  async removeAPI(){
    return API.remove(this, '/v1/beneficiario/'+this.idbeneficiario);
  }

  //Static

  static to(action){
    return Util.route('/beneficiario/'+action);
  }

  static async getAllAuthBeneficiarios(){
    let err, res;
    
    let login:Usuario = <Usuario> Usuario.findOne({auth:true});

    [err, res] = await Util.to(Util.get('/v1/entidadebeneficiario/'+login.identidade));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
        
    let tmpbeneficiarios = res.entidadebeneficiarios;
    let beneficiarios = []
    for(let i in tmpbeneficiarios){
      [err, res] = await Util.to(Util.get('/v1/beneficiario/'+ tmpbeneficiarios[i].idbeneficiario));
      let beneficiario_info = res.beneficiario;
      let beneficiario = this.resCreate(beneficiario_info);
      beneficiarios.push(beneficiario);
    }

    return beneficiarios;
  }

  static resCreate(res_beneficiario){//create beneficiario instance from a beneficiario response
    let beneficiario = this.findById(res_beneficiario.idbeneficiario);
    if(beneficiario) return beneficiario;
    let beneficiario_info = res_beneficiario;
    beneficiario_info.beneficiario_info = res_beneficiario.idbeneficiario;
    beneficiario = this.create(beneficiario_info);
    return beneficiario;
  }

  static async CreateAPI(beneficiarioInfo:any){
    let err, res;
    [err, res] = await Util.to(Util.post('/v1/beneficiario', beneficiarioInfo));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
    let beneficiario = this.resCreate(res.beneficiario);
    beneficiario.emit(['newly-created'], beneficiarioInfo, true);
    return beneficiario;
  }

  static async getById(idbeneficiario:string){
    let beneficiario = this.findById(idbeneficiario);
    if(beneficiario) return beneficiario;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/v1/beneficiario/'+idbeneficiario));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let beneficiario_info = res.beneficiario;
    beneficiario = this.resCreate(res.beneficiario);
    return beneficiario;
  }
}