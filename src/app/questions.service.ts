import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Question, MultipleChoiceQuestion, CheckboxQuestion, BalancingChemicalEquationsQuestion } from './question.model';

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

		return this.afs.collection<Question>(this.BASE_URL).valueChanges()
	}

	addMultipleChoiceQuestion(question: MultipleChoiceQuestion) {
		const data: MultipleChoiceQuestion = {
			explaination: question.explaination,
			question: question.question,
			type: question.type,
			tags: question.tags,
			subject: question.subject,
			answer: question.answer,
			choices: question.choices,
		}
		this.afs.collection<MultipleChoiceQuestion>(this.BASE_URL).add(data)
	}

	addCheckboxQuestion(question: CheckboxQuestion) {
		const data: CheckboxQuestion = {
			explaination: question.explaination,
			question: question.question,
			type: question.type,
			tags: question.tags,
			subject: question.subject,
			answers: question.answers,
			choices: question.choices,
		}
		this.afs.collection<CheckboxQuestion>(this.BASE_URL).add(data)
	}

	addBalancingChemicalEquationQuestion(question: BalancingChemicalEquationsQuestion) {
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
		this.afs.collection<BalancingChemicalEquationsQuestion>(this.BASE_URL).add(data)
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
}
