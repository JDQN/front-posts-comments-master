import { AddCommentCommand } from './../models/command.models';
import { Observable } from 'rxjs';
import { SocketService } from './../services/socket/socket.service';
import { PostView, CommentView, SocketMessage } from './../models/views.models';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RequestsService } from '../services/requests/requests.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { User } from '../commands/loginData';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post?: PostView;
  socket?: WebSocketSubject<SocketMessage>;
  newAuthor: string = ''
  newContent: string = ''
  user!: User;
  token!: string;
  seconds = 90;
  myTimer: any = '';

  constructor(
    private route: ActivatedRoute,
    private request: RequestsService,
    private location: Location,
    private socketService: SocketService,
    private state$: StateService
  ) { }

  ngOnInit(): void {
    this.getPost()

    this.state$.state.subscribe(currentUser => {
      const { displayName, email, photoUrl, uid } = currentUser.authenticatedPerson
      this.user = {
        displayName: displayName || '',
        email: email || '',
        photoUrl: photoUrl || '',
        uid: uid,
        rol: ""
      };
      this.token = currentUser.token
    });
    console.log(this.user)
  }

  ngOnDestroy() {
    console.log(`post-detail web socket closed`);
    this.closeSocketConnection();
    clearInterval(this.myTimer);
  }

  getPost() {
    const id: string | null = this.route.snapshot.paramMap.get('id')
    this.request.getPostsById(id).subscribe(
      foundPost => {
        this.post = foundPost
        console.log(this.post);

        this.connectToChannel(this.post ? this.post.aggregateId : 'mainSpace')

        // this.myTimer =  setInterval(() => {
        //    this.closeSocketConnection();
        //    this.connectToMainSpace()
        //  }, this.seconds * 1000);

      }
    )
  }

  connectToChannel(path: string) {
    this.socket = this.socketService.connetToSpecificSpace(path)
    this.socket.subscribe(message => {
      switch (message.type) {
        case "CommentAdded":
          let commentBody = JSON.parse(message.body);
          let comment: CommentView = commentBody;
          this.addComment(comment);
          break;
      }
    }
    )
  }

  createComment() {
    const command: AddCommentCommand = {
      postId: this.post?.aggregateId ? this.post?.aggregateId : '',
      commentId: (Math.random() * (10000000 - 100000) + 100000).toString(),
      author: this.user.displayName,
      content: this.newContent,
      participantId: this.user.uid
    }
    console.log(command)

    this.request.createComment(command).subscribe()
    this.newAuthor = ''
    this.newContent = ''
  }

  addComment(newComment: CommentView) {
    this.post?.comments.push(newComment)
  }

  goBack(): void {
    this.location.back();
    this.socket?.complete()
  }

  closeSocketConnection() {
    this.socket?.complete()
  }

}
