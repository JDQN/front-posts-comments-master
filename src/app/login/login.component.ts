import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StateService } from '../services/state/state.service';
import { RequestsService } from '../services/requests/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any
  form!: FormGroup;

  constructor(
    private autn$: AuthService,
    private router: Router,
    private state$: StateService,
    private request$: RequestsService) { 
      this.form = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      });
    }

  ngOnInit() {
  }


  //Redireccion al formulario de registro
  formRegister() {
    this.router.navigate(['/register']);
  }

 public submit(): void {
  const user = this.form.value;
  this.request$.logIn({
    username: user.username,
    password: user.password
  }).subscribe({
    next: access => {
      console.log(access.token)
      if (access) {
        this.state$.state.next({
          logedIn: true,
          authenticatedPerson: {
            uid: "",
            email: "",
            displayName: user.username == null ? 'user' : user.username,
            photoUrl: "../../assets/img/LogoSofka.jpeg",
          },
          token: access.token
        })
        this.request$.castEvent({
          eventId: (Math.random() * (10000000 - 100000) + 100000).toString(),
          participantId: "",
          date: new Date().toISOString().replace("T", " ").replace("Z", ""),
          element: "Usuario",
          typeOfEvent: "LogIn",
          detail: ""
        }).subscribe({
          next: (eventResponse) => {
            console.log(eventResponse);
          }
        });
        this.router.navigate(['/post-page']);
      }
    }
  }) 
}


  //Btn Login con GitHub
  loginGitHub() {

    this.autn$.loginWithGitHub()

      .then(response => {
        let pass = response.user.email + "GITHUB1"
        pass = pass.replace("@", '').replace(".", "")
        console.log(response)
        this.request$.logIn({
          username: response.user.displayName,
          password: pass
        }).subscribe({
          next: access => {
            console.log(access.token)
            if (access) {
              const { uid, displayName, email, photoURL } = response.user
              this.state$.state.next({
                logedIn: true,
                authenticatedPerson: {
                  uid: uid == null ? '' : uid,
                  email: email == null ? '' : email,
                  displayName: displayName == null ? 'user' : displayName,
                  photoUrl: photoURL == null ? '' : photoURL
                },
                token: access.token
              })
              this.request$.castEvent({
                eventId: (Math.random() * (10000000 - 100000) + 100000).toString(),
                participantId: response.user.uid,
                date: new Date().toISOString().replace("T", " ").replace("Z", ""),
                element: "Usuario",
                typeOfEvent: "LogIn",
                detail: ""
              }).subscribe({
                next: (eventResponse) => {
                  console.log(eventResponse);
                }
              });
              this.router.navigate(['/post-page']);
            }
          }
        })

      })
      .catch(error => console.log(error))
  }



  //Btn Login con Google
  loginGoogle() {
    this.autn$.loginWithGoogle()

      .then(response => {
        let pass = response.user.email + "GMAIL1"
        pass = pass.replace("@", '').replace(".", "")
        console.log(response)
        this.request$.logIn({
          username: response.user.displayName,
          password: pass
        }).subscribe({
          next: access => {
            console.log(access.token)
            if (access) {
              const { uid, displayName, email, photoURL } = response.user
              this.state$.state.next({
                logedIn: true,
                authenticatedPerson: {
                  uid: uid == null ? '' : uid,
                  email: email == null ? '' : email,
                  displayName: displayName == null ? 'user' : displayName,
                  photoUrl: photoURL == null ? '' : photoURL
                },
                token: access.token
              })
              this.request$.castEvent({
                eventId: (Math.random() * (10000000 - 100000) + 100000).toString(),
                participantId: response.user.uid,
                date: new Date().toISOString().replace("T", " ").replace("Z", ""),
                element: "Usuario",
                typeOfEvent: "LogIn",
                detail: ""
              }).subscribe({
                next: (eventResponse) => {
                  console.log(eventResponse);
                }
              })
              this.router.navigate(['/post-page']);
            }
          }
        })

      })
      .catch(error => console.log(error))
  }


}
