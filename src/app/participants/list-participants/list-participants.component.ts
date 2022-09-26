import { Component, OnInit ,ViewChild} from '@angular/core';
import { ParticipantView } from 'src/app/models/views.models';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.css']
})
export class ListParticipantsComponent implements OnInit {


  participants : ParticipantView[] = [];

  constructor(private request$ : RequestsService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getParticipants();
    
  }

  getParticipants(){
    this.request$.getParticipants().subscribe(payload => this.participants = payload);
  }

  view(){
    console.log(this.participants);
  }



}
