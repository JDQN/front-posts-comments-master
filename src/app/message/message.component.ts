import { Component, OnInit } from '@angular/core';
import { User } from '../commands/loginData';
import { MessageView, ParticipantView } from '../models/views.models';
import { RequestsService } from '../services/requests/requests.service';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  user!: User;
  participant!: ParticipantView
  messages!: MessageView[]


  constructor(
    private request$: RequestsService,
    private state$: StateService) { }

  ngOnInit(): void {
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

    this.request$.getParticipantById(this.user.uid).subscribe(
      foundParticipant => {
        this.participant = foundParticipant
        this.messages = this.participant.messages
        console.log(this.messages)
      }
    )

  }
}
