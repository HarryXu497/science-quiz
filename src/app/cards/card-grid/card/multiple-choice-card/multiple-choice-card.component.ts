import { MultipleChoiceQuestionChoices } from '.././../../../question.model';
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { MultipleChoiceQuestion } from 'src/app/question.model';
import { Question } from '../../../../question.model';
import { AnswerStateService } from '../answer-state.service';
import { sleep } from 'src/app/utils';


@Component({
  selector: 'app-multiple-choice-card',
  templateUrl: './multiple-choice-card.component.html',
  styleUrls: ['./multiple-choice-card.component.scss'],
})
export class MultipleChoiceCardComponent implements OnChanges, OnInit {
	constructor(public answerStateService: AnswerStateService) {}
	@Input("question") _question!: Question;
	question!: MultipleChoiceQuestion;
	
	@Input() waitFor: number = 2000;
	
	selectedIndex: number | null = null;
	answerIndex!: number;
	
	ngOnInit(): void {
		this.answerIndex = this.getIndexFromKey(this.question.answer);
	}
		
	ngOnChanges(changes: SimpleChanges) {
		this.question = (<unknown> changes["_question"].currentValue) as MultipleChoiceQuestion
	}

	get answerState() {
		return this.answerStateService.getState();
	}
	
	async onAnswerSelect(choice: string, index: number) {
		this.selectedIndex = index
		if (choice == this.question.answer) {
			this.answerStateService.setState('correct');
			await sleep(this.waitFor)
			this.answerStateService.setShow('answer');
			return;
		}
		
		this.answerStateService.setState('incorrect');
		await sleep(this.waitFor)
		this.answerStateService.setShow('answer');
		return;
	}

	private getIndexFromKey(key: MultipleChoiceQuestionChoices) {
		return Object.keys(this.question.choices).sort().indexOf(key);
	}

}
