import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Choices, MultipleChoiceQuestionChoices, MultipleChoiceQuestionIndicies } from 'src/app/question.model';
import { QuestionsService } from '../../../questions.service';

interface IForm {
	question: FormControl<string | null>;
	explaination: FormControl<string | null>;
	choices: FormArray<FormControl<string | null>>;
	answers: FormArray<FormControl<MultipleChoiceQuestionIndicies | null>>;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private questionsService: QuestionsService,
		private renderer: Renderer2,
	) {}

	@Input() tags!: (string | null)[];
	@Input() subject!: string | null;

	@Output() formReset = new EventEmitter<void>();
	@Output() submission = new EventEmitter<void>();
	
	form!: FormGroup<IForm>

	ngOnInit() {
		this.form = this.fb.group({
			question: [null as string | null, [Validators.required]],
			explaination: [null as string | null, [Validators.required]],
			choices: this.fb.array([
				[null as string | null],
				[null as string | null],
				[null as string | null],
				[null as string | null],
			]),
			answers: this.fb.array([] as (MultipleChoiceQuestionIndicies | null)[])
		})
	}

	onAnswerSelect(_index: number) {
		if (!(0 <= _index && _index <= 3)) throw new Error("index must be either 0, 1, 2, or 3");
		const index = _index as 0 | 1 | 2 | 3;
		const answers = this.form.controls.answers.value;
		
		if (answers.some(value => value === index)) {
			answers.splice(answers.indexOf(index), 1)
		}
		else {
			answers.push(index)
		}
	}

	isChecked(_index: number) {
		const index = _index as 0 | 1 | 2 | 3;
		const answers = this.form.controls.answers.value;

		return answers.includes(index)
	}

	async onSubmit() {
		const choices: Choices = {
			'A': this.choices.value[0]!,
			'B': this.choices.value[1]!,
			'C': this.choices.value[2]!,
			'D': this.choices.value[3]!,
		}

		await this.questionsService.addCheckboxQuestion(QuestionsService.createCheckboxQuestion({
			question: this.question.value!,
			subject: this.subject!.toLowerCase(),
			tags: (this.tags as string[]).map(s => s.toLowerCase()),
			explaination: this.explaination.value!,
			answers: ((this.answers.value).map(index => this.getKey(index!)) as MultipleChoiceQuestionChoices[]),
			choices: choices
		}))

		this.submission.emit();
	}

	onInput(element: HTMLTextAreaElement) {
		this.renderer.setStyle(element, "height", ``)
		this.renderer.setStyle(element, "height", `${element.scrollHeight}px`)
	}

	getKey(index: MultipleChoiceQuestionIndicies) {
		switch (index) {
			case 0: {
				return 'A'
			}
			case 1: {
				return'B'
			}
			case 2: {
				return'C'
			}
			case 3: {
				return'D'
			}
		}
	}


	onReset(...elements: HTMLTextAreaElement[]) {
		this.form.reset();

		this.formReset.emit();

		elements.forEach(element => {
			element.style.height = "",
			element.innerHTML = "";
		});
	}

	get question() {
		return this.form.controls.question;
	}

	get answers() {
		return this.form.controls.answers;
	}

	get explaination() {
		return this.form.controls.explaination;
	}

	get choices() {
		return this.form.controls.choices;
	}

}
