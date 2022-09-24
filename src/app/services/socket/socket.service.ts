import { PostView, CommentView } from './../../models/views.models';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  connetToGeneralSpace():WebSocketSubject<PostView>{
    return webSocket('WSS://gama-posts-comments.herokuapp.com/retrieve/mainSpace');
  }
  connetToSpecificSpace(post:string):WebSocketSubject<CommentView>{
    return webSocket(`WSS://gama-posts-comments.herokuapp.com/retrieve/${post}`);
  }

}
