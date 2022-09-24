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


  constructor(
    private router: Router,
    private auth$: AuthService,
    private state$: StateService,
    private request$: RequestsService) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {

  }


  public submit(): void {
    const user = this.form.value;
    this.auth$.registerUser({
      'username': user.username,
      'email': user.email,
      'password': user.password
    }).subscribe({
      next: (event: any) => {
        console.log(event)
        this.auth$.createParticipant({
          'participantId': event.id,
          'name': event.username,
          'photoUrl': "",
          'rol': 'USER',
        }).subscribe({
          next: (event: any) => {
            console.log(event)
          },
          error: (err: any) => console.log(err)
        })

      }
    });
    console.log(user)

    Swal.fire(
      'Registro',
      'Te has registrado con exito😎!',
      'success'
    )
  }


  regresar() {
    this.router.navigate(['/login']);
  }

  registerGoogle() {
    this.auth$.loginWithGoogle()
      .then(response => {
        let pass = response.user.displayName + "GMAIL1"
        pass = pass.replace(/\s+/g, '').replace('ñ', 'n')
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
                Swal.fire(
                  'Registro',
                  'Te has registrado con exito😎!',
                  'success'
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
        console.log("GITHUB",response)
        let pass = response.user.displayName + "GITHUB1"
        pass = pass.replace(/\s+/g, '').replace('ñ', 'n')
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
                Swal.fire(
                  'Registro',
                  'Te has registrado con exito😎!',
                  'success'
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

}

