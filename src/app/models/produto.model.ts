import { Model }     from 'browser-model';
import * as _        from 'underscore';
import { API }       from './../helpers/api.helper';
import { Util }      from './../helpers/util.helper';

export class Produto extends Model {
  apiUpdateValues:Array<string> = ['nome', 'email','cpf','telef','lougra','numero','compl','cidade','bairro','cep','estado','datanasc'];//these are the values that will be sent to the API

  idproduto;
  nome;

  static SCHEMA = {
    idproduto:{type:'string', primary:true},//this means every time you make a new object you must give it a _id
    nome  :{type:'string'},
  };

  constructor(obj:object){
    super(obj);
  }

  to(action){
    return Util.route('/produto/'+action+'/'+this.idproduto);
  }

  async saveAPI(){
    return API.save(this, '/v1/produto/'+this.idproduto);
  }

  async removeAPI(){
    return API.remove(this, '/v1/produto/'+this.idproduto);
  }

  //Static

  static to(action){
    return Util.route('/produto/'+action);
  }

  static async getAllAuthProdutos(){
    let err, res;    
    [err, res] = await Util.to(Util.get('/v1/produto'));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
        
    let tmpprodutos = res.produtos;
    let produtos = []
    for(let i in res.produtos){
      let produto_info = res.produtos[i];
      let produto = this.resCreate(produto_info);
      produtos.push(produto);
    }

    return produtos;
  }

  static resCreate(res_produto){//create produto instance from a produto response
    let produto = this.findById(res_produto.idproduto);
    if(produto) return produto;
    let produto_info = res_produto;
    produto_info.produto_info = res_produto.idproduto;
    produto = this.create(produto_info);
    return produto;
  }

  static async CreateAPI(produtoInfo:any){
    let err, res;
    [err, res] = await Util.to(Util.post('/v1/produto', produtoInfo));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
    let produto = this.resCreate(res.produto);
    produto.emit(['newly-created'], produtoInfo, true);
    return produto;
  }

  static async getById(idproduto:string){
    let produto = this.findById(idproduto);
    if(produto) return produto;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/v1/produto/'+idproduto));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let produto_info = res.produto;
    produto = this.resCreate(res.produto);
    return produto;
  }
}