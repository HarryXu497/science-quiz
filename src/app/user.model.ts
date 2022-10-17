import { Question } from './question.model';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

export interface IUser {
	uid: string;
	email: string;
	photoURL?: string;
	displayName?: string;
	questions: Question[];
}

export interface IUserFirebaseDocument {
	uid: string;
	email: string;
	photoURL?: string;
	displayName?: string;
	questions: AngularFirestoreDocument<Question>[];
}