import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
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
