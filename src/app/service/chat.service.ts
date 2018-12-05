import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage(mensaje: string) {
    const paylaod = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };
    // Llamamos al evento creado en el websocket service
    this.wsService.emit('mensaje', paylaod);
  }
  getMessage() {
    return this.wsService.listen('mensaje-nuevo');
  }

  getMessagePrivate() {
    return this.wsService.listen('mensaje-privado');
  }
}
