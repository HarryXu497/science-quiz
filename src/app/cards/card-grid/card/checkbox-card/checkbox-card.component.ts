import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/question.model';
import { sleep } from 'src/app/utils';
import { CheckboxQuestion, MultipleChoiceQuestionChoices } from '../../../../question.model';
import { AnswerStateService } from '../answer-state.service';

interface IForm {
	answers: FormArray<FormControl<boolean | null>>
}

@Component({
  selector: 'app-checkbox-card',
  templateUrl: './checkbox-card.component.html',
  styleUrls: ['./checkbox-card.component.scss']
})
export class CheckboxCardComponent implements OnInit {
	constructor(
		public answerStateService: AnswerStateService,
		private fb: FormBuilder,
	) {}
	
	form!: FormGroup<IForm>

	
	@Input("question") _question!: Question;
	question!: CheckboxQuestion

	@Input() waitFor: number = 2000;

	correctAnswers!: boolean[]

	ngOnInit() {
		this.form = this.fb.group({
			answers: this.fb.array([
				[false],
				[false],
				[false],
				[false],
			])
		})

		const answers = new Set(this.question.answers)

		this.correctAnswers = (<MultipleChoiceQuestionChoices[]> Object.keys(this.question.choices)).sort().map(key => answers.has(key) ? true : false)
	}

	ngOnChanges(changes: SimpleChanges) {
		this.question = (<unknown> changes["_question"].currentValue) as CheckboxQuestion;
	}

	async onSubmit() {
		const keys = (<MultipleChoiceQuestionChoices[]> Object.keys(this.question.choices)).sort()
		const answers = new Set(this.question.answers)

		for (let i = 0; i < keys.length; i++) {
			// Get the corresponding key
			const key = keys[i]

			if (this.answers.value[i] === true && !answers.has(key)) {
				this.answers.controls[i].setErrors({ "incorrect selection": true });
			}
			else if (this.answers.value[i] === false && answers.has(key)) {
				this.answers.controls[i].setErrors({ "not selected": true });
			}
			else {
				this.answers.controls[i].setErrors(null);
				this.answers.controls[i].updateValueAndValidity();
			}
		}

		if (this.answers.valid) {
			this.answerStateService.setState('correct');
			await sleep(this.waitFor)
			this.answerStateService.setShow('answer');
		}
		else {
			this.answerStateService.setState('incorrect');
			await sleep(this.waitFor)
			this.answerStateService.setShow('answer');
		}
	}

	get answerState() {
		return this.answerStateService.getState();
	}

	get answers() {
		return this.form.controls.answers;
	}
}
