import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../commands/loginData';
import { AuthService } from '../services/auth/auth.service';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-mis-canales',
  templateUrl: './mis-canales.component.html',
  styleUrls: ['./mis-canales.component.css']
})
export class MisCanalesComponent implements OnInit {

  items: MenuItem[] = [];
  user!: User;


  constructor(
    private auth$: AuthService,
    private state$: StateService
  ) { }

  ngOnInit(): void {
    this.state$.state.subscribe( currentUser => {
      const { displayName, email, photoUrl, uid } = currentUser.authenticatedPerson
      this.user = {
        displayName: displayName || '',
        email: email || '',
        photoUrl: photoUrl || '',
        uid: uid,
        rol :""
      };
    });
  }
}
