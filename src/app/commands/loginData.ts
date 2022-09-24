export interface LoginData {
   username: string | null;
   password: string | null;
}

export interface UserRegister {
   username: string | null;
   email: string | null;
   password: string;
}

export interface ParticipantCreated {
   participantId: string;
   name: string;
   photoUrl: string | null;
   rol: string;
}

export interface User {
   uid: string ;
   email: string ;
   displayName: string ;
   photoUrl: string ;
}

export interface StateBody {
   logedIn: boolean;
   authenticatedPerson: User,
   token: string;
}
