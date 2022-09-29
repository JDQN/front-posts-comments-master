import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth.service';
import { RequestsService } from '../services/requests/requests.service';
import { StateService } from '../services/state/state.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  validatePassword: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d#$@!%&*?]{8,32}$";


  constructor(
    private router: Router,
    private auth$: AuthService,
    private state$: StateService,
    private request$: RequestsService) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.validatePassword)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.validatePassword)]),
      avatar: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }


  public submit(): void {
    const user = this.form.value;

    this.auth$.registerUserForm(user.email, user.password).then(response => {
      console.log(response)
      this.auth$.registerUser({
        'username': user.email,
        'email': user.email,
        'password': user.password
      }).subscribe({
        next: (event: any) => {
          this.auth$.createParticipant({
            'participantId': response.user.uid,
            'name': user.username,
            'photoUrl': user.avatar,
            'rol': 'USER',
          }).subscribe({
            next: (event: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Registro',
                html: 'Te has registrado con éxito 😎!',
                background: '#030810e3',
                color: 'white'
              }
              )
              this.router.navigate([''])
            },
            error: (err: any) => console.log(err)
          })

        }
      })
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'El correo ya esta registrado',
        background: '#030810e3',
        color: 'white'
      })
    })
  }

  confirmPassword() {
    const { password, password2 } = this.form.value;
    if (password === password2) {
      this.submit()
    } else {
      Swal.fire({
        icon: 'error',
        title: '🔐 LAS CONTRASEÑAS NO COINCIDEN',
        background: '#030810e3',
        color: 'white'
      })
    }
  }

  modalError() {
    const estados: any = this.form.controls;
    console.log(estados)
    let mensaje: string = ""
    if (estados.username.status == "INVALID") mensaje += " 👉 Debe digitar el campo usuario"
    if (estados.password.status == "INVALID") mensaje += "<br> <br>🚨 La contraseña debe ser de mínimo 8 caracteres y debe contener al menos una mayuscula, una minuscula y un número"
    if (estados.email.status == "INVALID") mensaje += "<br> <br>👉 Debe digitar un correo valido"
    if (estados.password2.status == "INVALID") mensaje += "<br> <br>👉 Debe confirmar la contraseña"
    if (estados.avatar.status == "INVALID") mensaje += "<br> <br>👉 Debe seleccionar un avatar"

    Swal.fire({
      icon: 'error',
      title: 'DATOS INVALIDOS',
      html: mensaje,
      background: '#030810e3',
      color: 'white'
    })
  }


  regresar() {
    this.router.navigate(['/login']);
  }

  registerGoogle() {
    this.auth$.loginWithGoogle()
      .then(response => {
        let pass = response.user.email + "GMAIL1"
        pass = pass.replace("@", '').replace(/\./g, '')
        console.log(pass)
        this.auth$.registerUser({
          'username': response.user.displayName,
          'email': response.user.email,
          'password': pass
        }).subscribe({
          next: (event: any) => {
            console.log(response.user.photoURL)
            this.auth$.createParticipant({
              'participantId': response.user.uid,
              'name': event.username,
              'photoUrl': response.user.photoURL,
              'rol': 'USER',
            }).subscribe({
              next: (event: any) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Registro',
                  html: 'Te has registrado con éxito 😎!',
                  background: '#030810e3',
                  color: 'white'
                }
                )
                this.router.navigate([''])
              },
              error: (err: any) => console.log(err)
            })

          }
        })
        console.log(response)
      })

  }

  registerGitHub() {
    this.auth$.loginWithGitHub()
      .then(response => {
        console.log("GITHUB", response)
        let pass = response.user.email + "GITHUB1"
        pass = pass.replace("@", '').replace(/\./g, '')
        console.log(pass)
        this.auth$.registerUser({
          'username': response.user.displayName,
          'email': response.user.email,
          'password': pass
        }).subscribe({
          next: (event: any) => {
            console.log(response.user.photoURL)
            this.auth$.createParticipant({
              'participantId': event.id,
              'name': event.username,
              'photoUrl': response.user.photoURL,
              'rol': 'USER',
            }).subscribe({
              next: (event: any) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Registro',
                  html: 'Te has registrado con éxito 😎!',
                  background: '#030810e3',
                  color: 'white'
                })
                this.router.navigate([''])
              },
              error: (err: any) => console.log(err)
            })

          },
          error: (err: any) => console.log(err)
        })
        console.log(response)
      })
  }

}

