import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './service/websocket.service';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'basico';
  constructor(public wsService: WebsocketService,
              public chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.getMessagePrivate()
                    .subscribe(msg => {
                        console.log(msg);
                    });
  }
}
