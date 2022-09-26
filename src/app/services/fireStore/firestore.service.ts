import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Auth } from '@angular/fire/auth';
import { AdminView } from 'src/app/models/views.models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private usersCollection: AngularFirestoreCollection<AdminView>;

  constructor(private storage: AngularFirestore, private auth:Auth) {
    this.usersCollection = storage.collection<AdminView>('admin');
  }


  async getAdmins(): Promise<Array<AdminView>>{
    const result = await new Promise<AdminView[]>((resolve, reject) => {
      const query = this.usersCollection;
      query.get().subscribe({
        next: (data) => {
          const admins = new Array<AdminView>();
          data.forEach((admin) => {
            admins.push(admin.data());
          });
          resolve(admins);
        },
        error: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
    return result;
  }



}
