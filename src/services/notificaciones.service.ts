import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {configuracion} from '../llaves/configuracion';
import {NotificacionCorreo} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  EnviarCorreo(datos: NotificacionCorreo) {
    console.log("holaaaaa",configuracion.hashNotificacion)
    //const hash = configuracion.hashNotificacion
    let url = `${configuracion.urlCorreo}?${configuracion.destinoArg}=${datos.destinatario}&${configuracion.asuntoArg}=${datos.asunto}&${configuracion.mensajeArg}=${datos.mensaje}&${configuracion.hashArg}=${configuracion.hashNotificacion}`;
    fetch(url)
      .then((res: any) => {
        console.log(res.text())
      })
  }
}
