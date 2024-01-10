import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Registration } from '../interfaces/registration';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private registrationsRef: AngularFireList<Registration>;

  constructor(private database: AngularFireDatabase) {
    this.registrationsRef = this.database.list<Registration>('registrations');
  }

  getRegistrations(): Observable<Registration[]> {
    return this.registrationsRef.snapshotChanges().pipe(
      map((actions: SnapshotAction<Registration>[]) =>
        actions.map(a => {
          const data = a.payload.val();
          const id = a.payload.key;
          return { id, ...data };
        })
      )
    );
  }

  createRegistration(formData: Registration): void {
    this.registrationsRef.push(formData);
  }

  updateRegistration(id: string, registrationData: Registration): Promise<void> {
    return this.database.object(`registrations/${id}`).update(registrationData);
  }

  deleteRegistration(id: string): Promise<void> {
    return this.database.object(`registrations/${id}`).remove();
  }
}
