import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from './../services/socket/socket.service';
import { CreatePostCommand } from './../models/command.models';
import { PostView, SocketMessage } from './../models/views.models';
import { RequestsService } from './../services/requests/requests.service';
import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state/state.service';
import { User } from '../commands/loginData';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  socketManager?: WebSocketSubject<SocketMessage>;

  posts: PostView[] = []
  newTitle: string = '';
  newAuthor: string = '';
  values!: string[];
  user!: User;
  token!: string;

  constructor(private requests: RequestsService,
    private socket: SocketService,
    private state$: StateService
  ) { }

  ngOnInit(): void {
    this.getPosts()
    this.connectToMainSpace()

    this.state$.state.subscribe(currentUser => {
      const { displayName, email, photoUrl, uid } = currentUser.authenticatedPerson
      this.user = {
        displayName: displayName || '',
        email: email || '',
        photoUrl: photoUrl || '',
        uid: uid,
      };
      this.token = currentUser.token
    });
  }

  getPosts() {
    this.requests.getPosts().subscribe(
      payLoad => {
        this.posts = payLoad

      }
    );
  }

  createPost() {
    const newPost: CreatePostCommand = {
      postId: (Math.random() * (10000000 - 100000) + 100000).toString(),
      title: this.newTitle,
      author: this.user.displayName,
      photoUrl: this.user.photoUrl,
      participantId: this.user.uid

    }

    this.requests.addPost(newPost, this.token).subscribe({
      next: (event) => { console.log(event) }
    })

  }

  submitPost(command: CreatePostCommand) {
    this.requests.createPost(command)
      .subscribe()
  }

  deletePetition(postId: string) {
    this.requests.deletePost(postId, this.token)
      .subscribe(response => {
        console.log(response);
      })
  }

  connectToMainSpace() {

    this.socketManager = this.socket.connetToGeneralSpace()
    this.socketManager.subscribe((message) => {
      switch (message.type) {
        case "PostCreated":
          console.log(message.body);
          let post: PostView = message.body;
          this.newAuthor = ''
          this.newTitle = ''
          this.posts.unshift(post)
          break;

        case "PostDeleted":
          this.deletePost(message.body);
      }
    })
  }

  addPost(post: PostView) {
    console.log(post);
    this.newAuthor = ''
    this.newTitle = ''
    this.posts.unshift(post)
  }

  deletePost(id: string) {
    let postsThatStay = this.posts.filter(post => post.aggregateId != id);
    this.posts = postsThatStay
  }

  closeSocketConnection() {
    this.socketManager?.complete()
  }

}
