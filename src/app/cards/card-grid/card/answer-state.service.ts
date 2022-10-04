import { Injectable } from '@angular/core';

@Injectable()
export class AnswerStateService {
	private state: 'correct' | 'incorrect' | 'unanswered' = 'unanswered';
	private show: 'question' | 'answer'	= 'question';
	
	constructor() {}

	getState() {
		return this.state;
	}

	setState(state: 'correct' | 'incorrect' | 'unanswered' | boolean) {
		if (typeof state === 'boolean') {
			if (state === true) {
				this.state = 'correct';
			}
			else {
				this.state = 'incorrect';
			}

			return;
		}

		this.state = state;
	}

	getShow() {
		return this.show;
	}

	setShow(show: 'question' | 'answer' | boolean) {
		if (typeof show === 'boolean') {
			if (show === true) {
				this.show = 'question';
			}
			else {
				this.show = 'answer';
			}

			return;
		}

		this.show = show;
	}

	get isCorrect(): boolean {
		return this.state === 'correct';
	}

	get isIncorrect(): boolean {
		return this.state === 'incorrect';
	}

	get isUnanswered(): boolean {
		return this.state === 'unanswered';
	}

	get isAnswered(): boolean {
		return this.state !== 'unanswered';
	}

	get isShowingQuestion(): boolean {
		return this.show === 'question';
	}

	get isShowingAnswer(): boolean {
		return this.show === 'answer';
	}
}
