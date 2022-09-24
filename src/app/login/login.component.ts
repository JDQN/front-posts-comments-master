import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { RequestsService } from '../services/requests/requests.service';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
userData: any

  constructor(
    private autn$: AuthService,
    private router : Router,
    private state$: StateService,
    private request$: RequestsService ) {}

  ngOnInit() {
  }


  //Redireccion al formulario de registro
  formRegister(){
    this.router.navigate(['/register']);
  }


  //Btn Login con GitHub
  loginGitHub(){
   
    this.autn$.loginWithGitHub()
    
    .then(response => {
      let pass = response.user.displayName + "GITHUB1"
      pass = pass.replace(/\s+/g, '').replace('ñ', 'n')
      console.log(response)
      this.request$.logIn({
        username: response.user.displayName,
        password: pass
      }).subscribe({
        next: access => {
          console.log(access.token)
          if (access) {
            const { uid, displayName, email,  photoURL } = response.user
            this.state$.state.next({
              logedIn: true,
              authenticatedPerson: {
                uid:uid == null ? '' : uid,
                email:email == null ? '' : email,
                displayName:displayName == null ? 'user' : displayName,
                photoUrl:photoURL == null ? '' : photoURL
              },
              token: access.token
            })
            this.router.navigate(['/post-page']);
          }
        }
      })
      
    })
    .catch(error => console.log(error))
  }



  //Btn Login con Google
  loginGoogle(){
    this.autn$.loginWithGoogle()

    .then(response => {
      let pass = response.user.displayName + "GMAIL1"
      pass = pass.replace(/\s+/g, '').replace('ñ', 'n')
      console.log(response)
      this.request$.logIn({
        username: response.user.displayName,
        password: pass
      }).subscribe({
        next: access => {
          console.log(access.token)
          if (access) {
            const { uid, displayName, email,  photoURL } = response.user
            this.state$.state.next({
              logedIn: true,
              authenticatedPerson: {
                uid:uid == null ? '' : uid,
                email:email == null ? '' : email,
                displayName:displayName == null ? 'user' : displayName,
                photoUrl:photoURL == null ? '' : photoURL
              },
              token: access.token
            })
            this.router.navigate(['/posts']);
          }
        }
      })
      
    })
    .catch(error => console.log(error))
  }


}
