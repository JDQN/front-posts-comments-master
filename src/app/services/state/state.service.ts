import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateBody} from 'src/app/commands/loginData';

@Injectable({
  providedIn: 'root'
})

export class StateService {

  initialState: StateBody = {
    logedIn: false,
    authenticatedPerson: {
      displayName: "", 
      email: "", 
      photoUrl: "",
      uid: "",
    },
    token: "",
  }
  state = new BehaviorSubject(this.initialState)

  constructor() { }
}
