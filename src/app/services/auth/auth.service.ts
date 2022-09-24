import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, ParticipantCreated, UserRegister } from 'src/app/commands/loginData';
import {  Auth, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User as CurrentUser } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any

  constructor(
    private router: Router,
    private auth: Auth,
    private Http: HttpClient,) {
    }
    
  //Login con Formulario pendiente
  // login({ email, password }: LoginData) {
  //   return signInWithEmailAndPassword(this.auth, email, password);
  // }


  registerUser(command: UserRegister){
    return this.Http.post(`http://localhost:8080/auth/save/admin`, command)
  }
  
  createParticipant(command: ParticipantCreated){
    return this.Http.post(`http://localhost:8080/create/participant`, command)
  }

  getCurrentUser(): CurrentUser | null {
    return this.auth.currentUser;
  }

  //Login con Google
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  //Login con GitHub
  loginWithGitHub() {
    return signInWithPopup(this.auth, new GithubAuthProvider());
  }



  //Metodo Logout
  logout() {
    return signOut(this.auth);
  }

  
}