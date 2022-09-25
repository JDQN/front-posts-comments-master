import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from '../commands/loginData';
import { AuthService } from '../services/auth/auth.service';

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
  ) { }

  ngOnInit(): void {
    const { displayName, email, photoURL, uid } =
    this.auth$.getCurrentUser()!;
    this.user = {
    displayName: displayName || '',
    email: email || '',
    photoUrl: photoURL || '',
    uid: uid,
  };
  }

}
