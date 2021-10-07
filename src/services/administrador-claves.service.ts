import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Usuario} from '../models';
import {CambioClave} from '../models/cambio-clave.model';
import {UsuarioRepository} from '../repositories';
const generator = require('generate-password');
var CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorClavesService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
    ) {}

  /*
   * Add service methods here
   */
  async cambiarClave(credencialesClave: CambioClave): Promise<boolean>{
    let usuario = await this.usuarioRepository.findOne({
      where: {
        _id: credencialesClave.id_usuario,
        clave: credencialesClave.clave_actual
      }
    });
    if(usuario){
      usuario.clave = credencialesClave.nueva_clave;
      await this.usuarioRepository.updateById(credencialesClave.id_usuario,usuario);
      return true;
    }
     else {
    return false;
  }
  }

  async RecuperarClave(correo: string): Promise<Usuario | null>{
    let usuario = await this.usuarioRepository.findOne({
      where: {
        correo: correo
      }
    });
    if(usuario){
      let clave = this.crearClaveAleatoria();
      usuario.clave = this.CifrarTexto(clave);
      await this.usuarioRepository.updateById(usuario._id, usuario);
      return usuario;
    } else {
    return null;
  }
  }

  crearClaveAleatoria(){
    let password = generator.generate({
      length: 8,
      numbers: true,
      uppercase: true
    });
    return password;
  }

  CifrarTexto(texto: string){
    let textoCifrado = CryptoJS.MD5(texto).toString();
    return textoCifrado;
  }

}
