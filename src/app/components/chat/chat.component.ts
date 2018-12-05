import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto:string = '';
  mensajeSubscription: Subscription;
  mensajes: Array<any> = [];
  elemento: HTMLElement;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // Obtenemos la referencia al alemento HTML
    this.elemento = document.getElementById('chat-mensaje');
    this.mensajeSubscription = this.chatService.getMessage().subscribe(msg => {
      console.log('Mensaje GET', msg);
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }
  ngOnDestroy() {
    this.mensajeSubscription.unsubscribe();
  }
  enviar() {
    if(this.texto.trim().length === 0) {
      return;
    }
     this.chatService.sendMessage(this.texto);
     this.texto = '';
  }

}
