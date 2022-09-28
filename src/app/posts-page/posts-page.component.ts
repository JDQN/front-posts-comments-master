import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketService } from './../services/socket/socket.service';
import { AddFavoritePost, AddReactionCommand, AddRelevantVoteCommand, CreatePostCommand } from './../models/command.models';
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
  checkbocIsSelected: boolean;
  seconds = 50;
  myTimer: any = '';

  constructor(
    private requests: RequestsService,
    private socket: SocketService,
    private state$: StateService
  ) {
    this.checkbocIsSelected = false;
  }

  ngOnInit(): void {
    this.getPosts()
    this.connectToMainSpace()
    this.myTimer = setInterval(() => {
      this.closeSocketConnection();
      this.connectToMainSpace()
    }, this.seconds * 1000);



    this.state$.state.subscribe(currentUser => {
      const { displayName, email, photoUrl, uid, rol } = currentUser.authenticatedPerson
      this.user = {
        displayName: displayName || '',
        email: email || '',
        photoUrl: photoUrl || '',
        uid: uid,
        rol: rol
      };
      this.token = currentUser.token
    });
  }

  onChange() {
    console.log(this.checkbocIsSelected);
    if (this.checkbocIsSelected) {

    } else {
      this.orderByRelevanceVote();
    }
  }

  orderByRelevanceVote() {
    this.posts = this.posts.sort((a, b): number => {
      let relA = parseInt(a.relevanceVote);
      let relB = parseInt(b.relevanceVote);
      if (relA > relB) {
        return -1;
      }
      if (relA < relB) {
        return 1;
      }
      return 0;
    })
  }

  ngOnDestroy() {
    console.log(`Post page web socket closed`);
    this.closeSocketConnection();
    clearInterval(this.myTimer);
  }

  openDeleteModal(postId: string) {

    Swal.fire({
      title: 'Seguro?',
      text: "No podrá recuperar el canal y todos los comentarios se perderán!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      background: '#040d19',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePetition(postId)
        Swal.fire({
          title: 'Canal eliminado',
          icon: 'success',
          background: '#030810e3',
          color: 'white',
        }
        )
      }
    })
  }

  getPosts() {
    this.requests.getPosts().subscribe(
      payLoad => {
        this.posts = payLoad;
        console.log(this.posts);
        this.orderByRelevanceVote();
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
    this.requests.createPost(command, this.token)
      .subscribe()
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
        case "PostCreated":
          console.log(message.body);
          let postBody = JSON.parse(message.body)
          let post: PostView = postBody;
          this.newAuthor = ''
          this.newTitle = ''
          this.posts.push(post)
          this.onChange();
          break;

        case "PostDeleted":
          this.deletePost(message.body);
          break;

        case "ReactionAdded":
          let reactionBody = JSON.parse(message.body)
          let postId = reactionBody.postId;
          this.addReaction(postId, reactionBody.reaction)
          this.onChange();
          break;
        case "VoteUpdated":
          console.log("Entro a voto actualizado")
          console.log(message);
          let voteBody = JSON.parse(message.body);
          let postIdvote = voteBody.postId;
          this.addVoteUpdateToPost(postIdvote, voteBody.relevantVote)

      }
    })
  }

  reactionPetition(postId: string, reaction: string) {
    const reactionToSend: AddReactionCommand = {
      postId: postId,
      reaction: reaction
    }
    this.requests.addReaction(reactionToSend, this.token)
      .subscribe()

    this.requests.castEvent({
      eventId: (Math.random() * (10000000 - 100000) + 100000).toString(),
      participantId: this.user.uid,
      date: new Date().toISOString().replace("T", " ").replace("Z", ""),
      element: "Canal",
      typeOfEvent: "Reacción",
      detail: reaction
    }).subscribe({
      next: (eventResponse) => {
        console.log(eventResponse);
      }
    });
  }

  addRelevantVote(postId: string) {
    const postToUpdate: AddRelevantVoteCommand = {
      postId: postId,
    }
    this.requests.updateRelevantVote(postToUpdate, this.token)
      .subscribe()

    this.requests.castEvent({
      eventId: (Math.random() * (10000000 - 100000) + 100000).toString(),
      participantId: this.user.uid,
      date: new Date().toISOString().replace("T", " ").replace("Z", ""),
      element: "Canal",
      typeOfEvent: "Reacción",
      detail: "Voto agregado"
    }).subscribe({
      next: (eventResponse) => {
        console.log(eventResponse);
      }
    });
  }


  addReaction(postId: string, reaction: string) {
    console.log(postId + "    " + reaction);
    let postToAddReaction = this.posts.find(e => e.aggregateId === postId);
    console.log("Line 121 " + postToAddReaction);
    postToAddReaction?.reactions.push(reaction);
    let index = postToAddReaction ? this.posts.indexOf(postToAddReaction) : 0;
    this.posts[index] = postToAddReaction ? postToAddReaction : this.posts[index]

  }

  addVoteUpdateToPost(postId: string, relevantVote: string) {
    console.log(postId + "    " + relevantVote);
    this.posts.forEach(post => {
      if (post.aggregateId == postId) {
        let newVote = parseInt(post.relevanceVote) + parseInt(relevantVote);
        post.relevanceVote = newVote.toString();
      }
    })
  }

  addFavorite(postId: string, participantId: string) {
    let favorites: AddFavoritePost = {
      participantId: participantId,
      postId: postId
    }
    this.requests.addFavoritePost(favorites, this.token).subscribe()
    Swal.fire({
      icon: 'success',
      html: 'Canal agregado a favoritos ⭐',
      background: '#030810e3',
      color: 'white'
    }
    )
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

  getReactions(post: PostView, match: string) {
    return post.reactions.filter(reaction => reaction === match).length
  }

}
