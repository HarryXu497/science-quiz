import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of, switchMap } from 'rxjs';
import { IUser, IUserFirebaseDocument } from '../user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { Question } from '../question.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	user$: Observable<IUser | null>

  	constructor(
		private auth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router,
	) {
		this.user$ = (this.auth.authState.pipe(
			switchMap(user => {
				if (user) {
					return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
				}
				else {
					return of(null);
				}
			})
		) as Observable<IUser | null>);
	}

	async signInWithGooglePopup() {
		const provider = new GoogleAuthProvider();
		const credential = await this.auth.signInWithPopup(provider);

		if (!credential.user) throw new Error("Cannot sign in with Google popup.")

		return this.updateUserData(credential.user);
	}

	async signOut() {
		await this.auth.signOut();
		return this.router.navigate(['/'])
	}

	private updateUserData(user: firebase.default.User) {
		const userRef: AngularFirestoreDocument<IUserFirebaseDocument> = this.afs.doc<IUserFirebaseDocument>(`users/${user.uid}`)

		const data: IUserFirebaseDocument = {
			uid: user.uid,
			email: user.email!,
			displayName: user.displayName!,
			photoURL: user.photoURL!,
			questions: [] as AngularFirestoreDocument<Question>[],
		}

		return userRef.set(data, { merge: true });
	}
}
