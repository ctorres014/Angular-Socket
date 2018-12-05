import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../service/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  constructor(public wsService: WebsocketService) { }

  
}
