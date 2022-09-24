import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParticipantView } from '../models/views.models';
import { RequestsService } from '../services/requests/requests.service';
import { StateService } from '../services/state/state.service';
import { User } from '../commands/loginData';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  participant?: ParticipantView;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private request: RequestsService,
    private state$: StateService
  ) { }

  ngOnInit(): void {
    this.state$.state.subscribe(currentUser => {
      const { displayName, email, photoUrl, uid } = currentUser.authenticatedPerson
      this.user = {
        displayName: displayName || '',
        email: email || '',
        photoUrl: photoUrl || '',
        uid: uid,
      };
    });

    this.getParticipant()
  }

  getParticipant() {
    const id: string = this.user.uid;
    this.request.getParticipantById(id).subscribe(
      foundParticipant => {
        this.participant = foundParticipant
        console.log(foundParticipant)
      }
    )
  }

}
