import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socketStatus: boolean = false;
  usuario: Usuario;

  constructor(private socket: Socket,
              private router: Router) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }
  getUsuario() {
    return this.usuario;
  }
  emit(evento: string, payload?: any, callBack?: Function) {
    this.socket.emit(evento, payload, callBack);
  }
  listen(evento: string) {
    // Este metodo necesita regresar un observable
    // Sobre el cual se pueda subcribir en cualquier parte de la app
    return this.socket.fromEvent(evento);
  }
  loginWS(nombre: string) {
    console.log('configurando', nombre);
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }
  logOutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('/');
  }

  private guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  private cargarStorage() {
    if(localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  }
}
