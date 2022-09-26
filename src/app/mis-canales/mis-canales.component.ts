import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { WebSocketSubject } from 'rxjs/webSocket';
import Swal from 'sweetalert2';
import { User } from '../commands/loginData';
import { PostView, SocketMessage } from '../models/views.models';
import { AuthService } from '../services/auth/auth.service';
import { RequestsService } from '../services/requests/requests.service';
import { SocketService } from '../services/socket/socket.service';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-mis-canales',
  templateUrl: './mis-canales.component.html',
  styleUrls: ['./mis-canales.component.css']
})
export class MisCanalesComponent implements OnInit {

  socketManager?: WebSocketSubject<SocketMessage>;

  items: MenuItem[] = [];
  user!: User;
  posts: PostView[] = [];
  token!: string;
  seconds = 90;

  constructor(
    private requests: RequestsService,
    private auth$: AuthService,
    private state$: StateService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.getPosts();

    this.connectToMainSpace()
    //  setInterval(() => {
    //   this.closeSocketConnection();
    //    this.connectToMainSpace()
    //  }, this.seconds * 1000);

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
  }

  getPosts() {
    this.requests.getPosts().subscribe(
      payLoad => {
        this.posts = payLoad
      }
    );
  }

  openDeleteModal(postId: string) {

    Swal.fire({
      title: 'Seguro?',
      text: "No podrá recuperar el canal y todos los comentarios se perderán!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePetition(postId)
        Swal.fire(
          'Canal eleminado!',
          '',
          'success'
        )
      }
    })
  }

  deletePetition(postId: string) {
    this.requests.deletePost(postId, this.token)
      .subscribe(response => {
        console.log(response);
      })

    this.requests.castEvent({
      eventId: (Math.random() * (10000000 - 100000) + 100000).toString(),
      participantId: this.user.uid,
      date: new Date().toISOString().replace("T", " ").replace("Z", ""),
      element: "Canal",
      typeOfEvent: "Eliminado",
      detail: ""
    }).subscribe({
      next: (eventResponse) => {
        console.log(eventResponse);
      }
    });
  }

  connectToMainSpace() {

    this.socketManager = this.socket.connetToGeneralSpace()
    this.socketManager.subscribe((message) => {
      switch (message.type) {

        case "PostDeleted":
          this.deletePost(message.body);
          break;

      }
    })
  }

  deletePost(id: string) {
    let postsThatStay = this.posts.filter(post => post.aggregateId != id);
    this.posts = postsThatStay
  }

  closeSocketConnection() {
    this.socketManager?.complete()
  }

}
