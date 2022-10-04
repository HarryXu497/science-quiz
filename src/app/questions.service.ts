import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from '@angular/fire/firestore';
import * as firebase from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Question, MultipleChoiceQuestion, CheckboxQuestion, BalancingChemicalEquationsQuestion, Meta } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

	private readonly BASE_URL = 'questions'

  	constructor(private afs: AngularFirestore) { }

	getQuestions(tags?: string[]): Observable<Question[]> {
		if (tags) {
			return this.afs.collection<Question>(this.BASE_URL, ref => ref.where('tags', 'array-contains-any', tags)).valueChanges() 
		}

		return this.afs.collection<Question>(this.BASE_URL, ref => ref.orderBy('createdAt')).valueChanges()
	}

	async addMultipleChoiceQuestion(question: MultipleChoiceQuestion) {
		const data: MultipleChoiceQuestion = {
			explaination: question.explaination,
			question: question.question,
			type: question.type,
			tags: question.tags,
			subject: question.subject,
			answer: question.answer,
			choices: question.choices,
		}
		return await this.afs.collection<MultipleChoiceQuestion & Meta>(this.BASE_URL).add(this.addMetadata(data));
	}

	async addCheckboxQuestion(question: CheckboxQuestion) {
		const data: CheckboxQuestion = {
			explaination: question.explaination,
			question: question.question,
			type: question.type,
			tags: question.tags,
			subject: question.subject,
			answers: question.answers,
			choices: question.choices,
		}
		return await this.afs.collection<CheckboxQuestion & Meta>(this.BASE_URL).add(this.addMetadata(data))
	}

	async addBalancingChemicalEquationQuestion(question: BalancingChemicalEquationsQuestion) {
		const data: BalancingChemicalEquationsQuestion = {
			explaination: question.explaination,
			question: question.question,
			type: question.type,
			tags: question.tags,
			subject: question.subject,
			answers: question.answers,
			products: question.products,
			reactants: question.reactants,
			reactionType: question.reactionType
		}
		return await this.afs.collection<BalancingChemicalEquationsQuestion & Meta>(this.BASE_URL).add(this.addMetadata(data))
	}


	/// Static alternate constructors
	static createMultipleChoiceQuestion(question: Omit<MultipleChoiceQuestion, 'type'>): MultipleChoiceQuestion {
		return { ...question, type: 'multiple-choice' }
	}

	static createCheckboxQuestion(question: Omit<CheckboxQuestion, 'type'>): CheckboxQuestion {
		return { ...question, type: 'checkbox' }
	}

	static createBalancingChemicalEquationQuestion(question: Omit<BalancingChemicalEquationsQuestion, 'type'>): BalancingChemicalEquationsQuestion {
		return { ...question, type: 'balancing-chemical-equations' }
	}

	private addMetadata<T>(object: T): T & Meta {
		return { ...object, createdAt: serverTimestamp() }
	}
}
