import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipantView } from 'src/app/models/views.models';
import { RequestsService } from 'src/app/services/requests/requests.service';
import { PrimeNGConfig } from 'primeng/api';
import Swal from 'sweetalert2';
import { SendMessageCommand } from 'src/app/models/command.models';
import { StateService } from 'src/app/services/state/state.service';
import { User } from 'src/app/commands/loginData';
import { uuidv4 } from '@firebase/util';


@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.css']
})
export class ListParticipantsComponent implements OnInit {

  user!: User
  participants: ParticipantView[] = [];
  token!: string;

  constructor(private request$: RequestsService,
    private primengConfig: PrimeNGConfig,
    private state$: StateService) { }

  ngOnInit(): void {
    this.getParticipants();
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

  getParticipants() {
    this.request$.getParticipants().subscribe(payload => this.participants = payload);
  }

  sendMessage(participantId: string, name: string) {
    console.log(participantId, name);
    Swal.fire({
        title: 'Escribe tu mensaje',
        input: 'text',
        background: '#030810e3',
        color: 'white',
        inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
    
      preConfirm: (message) => {
        const sendMessageCommand: SendMessageCommand = {
          messageId: uuidv4(),
          participantId: participantId,
          name: name,
          content: message
        }
        return this.request$.sendMessageToParticipant(sendMessageCommand, this.token).subscribe({
          next: (res) => { return res }
        })

      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Mensaje enviado con éxito`,
          background: '#030810e3',
          color: 'white',
        })
      }
    })

  }



}
