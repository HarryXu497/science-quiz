import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Question, QuestionType } from '../../../question.model';
import { AnswerStateService } from './answer-state.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [AnswerStateService],
  animations: [
	trigger('answered', [
		transition("question => answer", 
			animate(`800ms`, style({
				transform: "rotateX(180deg)"
			}))
		)
	]),
  ]
})
export class CardComponent {
	@Input() type!: QuestionType
	@Input() question!: Question;

	constructor(private answerStateService: AnswerStateService) {}

	get answerState() {
		return this.answerStateService.getState()
	}

	get answerShow() {
		return this.answerStateService.getShow()
	}
}
