import { DocumentReference } from '@angular/fire/compat/firestore';
import { Question } from './question.model';

export interface QuizFirebaseSchema {
	name: string;
	questions: DocumentReference<Question>[];
	subject: string;
	tags: string[];
	authorId: string; 
}

export interface Quiz {
	name: string;
	questions: Question[];
	subject: string;
	tags: string[];
	authorId: string; 
}