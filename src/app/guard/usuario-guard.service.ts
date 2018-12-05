import { Injectable } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(public wsService: WebsocketService,
            private router: Router) { }

  canActivate() {
    if(this.wsService.getUsuario()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
    }

  }

}
