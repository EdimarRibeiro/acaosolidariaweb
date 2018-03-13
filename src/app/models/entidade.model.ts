import { Model }     from 'browser-model';
import * as _        from 'underscore';
import { API }       from './../helpers/api.helper';
import { Util }      from './../helpers/util.helper';

export class Entidade extends Model {
  apiUpdateValues:Array<string> = ['nome', 'email','cnpj','telef','lougra','numero','compl','cidade','bairro','cep','estado'];//these are the values that will be sent to the API

  identidade;
  nome;

  static SCHEMA = {
    identidade:{type:'string', primary:true},//this means every time you make a new object you must give it a _id
    nome  :{type:'string'},
    cnpj  :{type:'string'},
    email :{type:'string'},
    telef :{type:'string'},
    lougra:{type:'string'},
    numero:{type:'string'},
    compl :{type:'string'},
    cidade:{type:'string'},
    bairro:{type:'string'},
    cep   :{type:'string'},
    estado:{type:'string'},
    data  :{type:'date'},
  };

  constructor(obj:object){
    super(obj);
  }

  /*
  Usuarios(){
    return this.belongsToMany(Usuario, 'usuarios.user', 'id', true);
  }
*/
  to(action){
    return Util.route('/entidade/'+action+'/'+this.identidade);
  }

  async saveAPI(){
    return API.save(this, '/v1/entidade/'+this.identidade);
  }

  async removeAPI(){
    return API.remove(this, '/v1/entidade/'+this.identidade);
  }

  //Static

  static to(action){
    return Util.route('/entidade/'+action);
  }

  static async getAllAuthEntidades(){
    let err, res;
    [err, res] = await Util.to(Util.get('/v1/entidade'));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let entidades = []
    for(let i in res.entidades){
      let entidade_info = res.entidades[i];
      let entidade = this.resCreate(entidade_info);
      entidades.push(entidade);
    }

    return entidades;
  }

  static resCreate(res_entidade){//create entidade instance from a entidade response
    let entidade = this.findById(res_entidade.identidade);
    if(entidade) return entidade;
    let entidade_info = res_entidade;
    entidade_info.identidade = res_entidade.identidade;

    entidade = this.create(entidade_info);
    return entidade;
  }

  static async CreateAPI(entidadeInfo:any){
    let err, res;
    [err, res] = await Util.to(Util.post('/v1/entidade', entidadeInfo));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
    let entidade = this.resCreate(res.entidade);
    entidade.emit(['newly-created'], entidadeInfo, true);
    return entidade;
  }

  static async getById(identidade:string){
    let entidade = this.findById(identidade);
    if(entidade) return entidade;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/v1/entidade/'+identidade));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let entidade_info = res.entidade;
    entidade = this.resCreate(res.entidade);
    return entidade;
  }

}
