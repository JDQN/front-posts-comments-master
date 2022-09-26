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

  participant!: ParticipantView;
  user!: User;
  event: any
  first = 0;
  rows = 10;

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
        rol: ""
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


  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.event ? this.first === (this.event.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.event ? this.first === 0 : true;
  }

}
