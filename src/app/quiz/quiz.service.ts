import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Question } from '../question.model';
import { Quiz, QuizFirebaseSchema } from '../quiz.model';

// string array holds url to documents
interface QuizObject extends Omit<Quiz, 'questions'> {
	questions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

	private readonly BASE_URL = 'quiz';  

  	constructor(
		private afs: AngularFirestore,
		private auth: AuthenticationService,
	) { }

	async createQuiz(_quiz: QuizObject) {
		const user = this.auth.user;

		const quiz: QuizFirebaseSchema = {
			name: _quiz.name,
			questions: _quiz.questions.map(url => this.afs.doc<Question>(url).ref),
			subject: _quiz.subject,
			tags: _quiz.tags,
			authorId: user?.uid!
		}

		await this.afs.collection<QuizFirebaseSchema>(this.BASE_URL).add(quiz)
	}
}
