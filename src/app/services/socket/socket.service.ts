import { PostView, CommentView, SocketMessage } from './../../models/views.models';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  GENERAL_SPACE_LOCAL = "ws://localhost:9090/retrieve/mainSpace"
  SPECIFIC_SPACE_LOCAL = "ws://localhost:9090/retrieve/"
  GENERAL_SPACE_HEROKU = 'WSS://puntoycoma-gama.herokuapp.com/retrieve/mainSpace'
  SPECIFIC_SPACE_HEROKU = `WSS://puntoycoma-gama.herokuapp.com/retrieve/`


  constructor() { }
  connetToGeneralSpace(): WebSocketSubject<SocketMessage> {
    return webSocket(this.GENERAL_SPACE_HEROKU);
  }
  connetToSpecificSpace(post: string): WebSocketSubject<SocketMessage> {
    return webSocket(this.SPECIFIC_SPACE_HEROKU + post);
  }

}
