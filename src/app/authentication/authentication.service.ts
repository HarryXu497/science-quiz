import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Question } from '../question.model';
import { IUser, IUserFirebaseDocument } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	user$: Observable<IUser | null>
	user: IUser | null = null;

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
			}),
			// set `user` property to most recent value of `user$`
		) as Observable<IUser | null>);

		this.user$.pipe(
			tap(user => this.user = user)
		)
	}

	async signInWithGooglePopup() {
		const provider = new GoogleAuthProvider();
		const credential = await this.auth.signInWithPopup(provider);

		if (!credential.user) throw new Error("Cannot sign in with Google popup.")

		return this.updateUserData(credential.user);
	}

	async signInWithEmailAndPassword(email: string, password: string) {
		const credential = await this.auth.signInWithEmailAndPassword(email, password)

		if (!credential.user) throw new Error("Cannot sign in with email and password popup.")

		return this.updateUserData(credential.user);
	}

	async signUpWithEmailAndPassword(email: string, password: string) {
		const credential = await this.auth.createUserWithEmailAndPassword(email, password)

		if (!credential.user) throw new Error("Cannot sign in with email and password popup.")

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
