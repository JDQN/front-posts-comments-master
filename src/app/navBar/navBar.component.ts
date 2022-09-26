import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from '../commands/loginData';
import { AuthService } from '../services/auth/auth.service';
import { StateService } from '../services/state/state.service';


@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [];
  user!: User;
  stateOfUser: any

  constructor(
    private auth$: AuthService,
    private router: Router,
    private state$: StateService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/post-page',
      },
      {
        label: 'Canales favoritos',
        icon: 'fa-solid fa-circle-plus',
        routerLink: '/postFavorite',
      },
      {
        label: 'Historico de eventos',
        icon: 'fa-solid fa-gamepad',
        routerLink: '/historico',
      },
      {
        label: 'Mis canales',
        icon: 'fa-solid fa-gamepad',
        routerLink: '/canales',
      },
      {
        label: 'Lista de participantes ',
        icon: 'fa-solid fa-gamepad',
        routerLink: '/participantes',
      }

    ];


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


  logout() {
    this.auth$.logout()
    this.router.navigate(['login'])
  }
}
