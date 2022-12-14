import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StateService } from '../services/state/state.service';
import { RequestsService } from '../services/requests/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/fireStore/firestore.service';
import { ParticipantView } from '../models/views.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any
  form!: FormGroup;
  validatePassword: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d#$@!%&*?]{8,32}$";

  constructor(
    private autn$: AuthService,
    private router: Router,
    private state$: StateService,
    private request$: RequestsService,
    private fireStore$: FirestoreService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.validatePassword)]),
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
    this.autn$.loginWhitEmailAndPassword(user.email, user.password).then(response => {
      this.request$.logIn({
        username: user.email,
        password: user.password
      }).subscribe({
        next: async access => {
          console.log(access.token)
          if (access) {

            const { uid, email, photoURL } = response.user;
            const adminEncontrado = await this.searchAdminByEmail(email);
            this.request$.getParticipantById(uid).subscribe({
              next: participante => {
                let imagen = participante.photoUrl === null ? '' : participante.photoUrl
                this.state$.state.next({
                  logedIn: true,
                  authenticatedPerson: {
                    uid: uid == null ? '' : uid,
                    email: email == null ? '' : email,
                    displayName: participante.name,
                    photoUrl: imagen,
                    rol: adminEncontrado.length > 0 ? "ADMIN" : "USER"
                  },
                  token: access.token
                })
              }
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
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: '???? Usuario/Contrase??a incorrectos',
        background: '#030810e3',
        color: 'white'
      })
    })
  }


  //Btn Login con GitHub
  loginGitHub() {

    this.autn$.loginWithGitHub()

      .then(response => {
        let pass = response.user.email + "GITHUB1"
        pass = pass.replace("@", '').replace(/\./g, '')
        console.log(response)
        this.request$.logIn({
          username: response.user.displayName,
          password: pass
        }).subscribe({
          next: async access => {
            console.log(access.token)
            if (access) {
              const { uid, displayName, email, photoURL } = response.user
              const adminEncontrado = await this.searchAdminByEmail(email);
              this.state$.state.next({
                logedIn: true,
                authenticatedPerson: {
                  uid: uid == null ? '' : uid,
                  email: email == null ? '' : email,
                  displayName: displayName == null ? 'user' : displayName,
                  photoUrl: photoURL == null ? '' : photoURL,
                  rol: adminEncontrado.length > 0 ? "ADMIN" : "USER"
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
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'El correo no se encuentra registrado, crea una cuenta nueva con GitHub ',
              background: '#030810e3',
              color: 'white'
            })
          }
        })

      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Este correo ya esta registrado',
          background: '#030810e3',
          color: 'white'
        })
      })
  }



  //Btn Login con Google
  async loginGoogle() {
    this.autn$.loginWithGoogle()

      .then(response => {
        let pass = response.user.email + "GMAIL1"
        pass = pass.replace("@", '').replace(/\./g, '')
        console.log(response)
        this.request$.logIn({
          username: response.user.displayName,
          password: pass
        }).subscribe({
          next: async access => {
            console.log(access.token)
            if (access) {
              const { uid, displayName, email, photoURL } = response.user;
              const adminEncontrado = await this.searchAdminByEmail(email);
              this.state$.state.next({
                logedIn: true,
                authenticatedPerson: {
                  uid: uid == null ? '' : uid,
                  email: email == null ? '' : email,
                  displayName: displayName == null ? 'user' : displayName,
                  photoUrl: photoURL == null ? '' : photoURL,
                  rol: adminEncontrado.length > 0 ? "ADMIN" : "USER"
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
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'El correo no se encuentra registrado, crea una cuenta nueva con Google',
              background: '#030810e3',
              color: 'white'
            })
          }
        })

      })
      .catch(error => console.log(error))
  }


  modalError() {
    const estados: any = this.form.controls;
    console.log(estados)
    let mensaje: string = ""
    if (estados.email.status == "INVALID") mensaje += "???? Debe digitar un correo valido"
    if (estados.password.status == "INVALID") mensaje += "<br> <br>???? La contrase??a debe ser de m??nimo 8 caracteres y debe contener al menos una mayuscula, una minuscula y un n??mero"


    Swal.fire({
      icon: 'error',
      title: 'DATOS INVALIDOS',
      html: mensaje,
      background: '#030810e3',
      color: 'white'
    })
  }

  async searchAdminByEmail(email: string | null) {
    const dataAdmin = await this.fireStore$.getAdmins();
    return dataAdmin.filter(admin => admin.email == email);

  }


}
