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
        label: 'Favoritos',
        icon: 'pi pi-star',
        routerLink: '/postFavorite',
      },
      {
        label: 'Historial',
        icon: 'pi pi-book',
        routerLink: '/historico',
      },
      {
        label: 'Mis canales',
        icon: 'pi pi-sitemap',
        routerLink: '/canales',
      },
      {
        label: 'Participantes ',
        icon: 'pi pi-list',
        routerLink: '/participantes',
      },
      {
        label: 'Bandeja de Entrada',
        icon: 'pi pi-envelope',
        routerLink: '/message',
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
