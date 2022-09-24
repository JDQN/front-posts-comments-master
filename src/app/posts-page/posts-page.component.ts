import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from './../services/socket/socket.service';
import { CreatePostCommand } from './../models/command.models';
import { PostView } from './../models/views.models';
import { RequestsService } from './../services/requests/requests.service';
import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state/state.service';
import { User } from '../commands/loginData';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  socketManager?: WebSocketSubject<PostView>;

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

  connectToMainSpace() {
    this.socketManager = this.socket.connetToGeneralSpace()
    this.socketManager.subscribe((message) => {
      this.addPost(message)
    })
  }

  addPost(post: PostView) {
    this.newAuthor = ''
    this.newTitle = ''
    this.posts.unshift(post)
  }

  closeSocketConnection() {
    this.socketManager?.complete()
  }

}
