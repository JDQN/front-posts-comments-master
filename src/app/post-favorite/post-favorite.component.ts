import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../commands/loginData';
import { ParticipantView, PostView } from '../models/views.models';
import { AuthService } from '../services/auth/auth.service';
import { RequestsService } from '../services/requests/requests.service';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-post-favorite',
  templateUrl: './post-favorite.component.html',
  styleUrls: ['./post-favorite.component.css']
})
export class PostFavoriteComponent implements OnInit {

  items: MenuItem[] = [];
  user!: User;
  posts: PostView[] = []
  participant!: ParticipantView 
  
  constructor(
    private auth$: AuthService,
    private state$: StateService,
    private requests: RequestsService
  ) { }

  ngOnInit(): void {
    this.getPosts()
    this.state$.state.subscribe(currentUser => {
      const { displayName, email, photoUrl, uid } = currentUser.authenticatedPerson
      this.user = {
        displayName: displayName || '',
        email: email || '',
        photoUrl: photoUrl || '',
        uid: uid,
        rol :""
      };
    });

    this.getParticipant()
    console.log(this.participant)
  }


  getPosts() {
    this.requests.getPosts().subscribe(
      payLoad => {
        this.posts = payLoad
      }
    );
  }

  getParticipant() {
    const id: string = this.user.uid;
    this.requests.getParticipantById(id).subscribe(
      foundParticipant => {
        this.participant = foundParticipant
        console.log(foundParticipant)
      }
    )
  }
}
