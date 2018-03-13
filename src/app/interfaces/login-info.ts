import { Usuario }  from './usuario';
export interface LoginInfo {
  token?:string,
  auth_info?:Object,
  usuario?:Usuario,
  idusuario?:string,
}
