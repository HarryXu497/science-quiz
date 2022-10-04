import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Choices, MultipleChoiceQuestionChoices } from 'src/app/question.model';
import { QuestionsService } from '../../../questions.service';

interface IForm {
	question: FormControl<string | null>;
	explaination: FormControl<string | null>;
	choices: FormArray<FormControl<string | null>>;
	answer: FormControl<MultipleChoiceQuestionChoices | null>;
}

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {

	@Input() tags!: (string | null)[];
	@Input() subject!: string | null;

	@Output() formReset = new EventEmitter<void>();
	@Output() submission = new EventEmitter<void>();

	constructor(
		private fb: FormBuilder,
		private renderer: Renderer2,
		private questionsService: QuestionsService
	) { }

	form!: FormGroup<IForm>;

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
			answer: [null as MultipleChoiceQuestionChoices | null, Validators.required]
		})
	}

	onInput(element: HTMLTextAreaElement) {
		this.renderer.setStyle(element, "height", ``)
		this.renderer.setStyle(element, "height", `${element.scrollHeight}px`)
	}

	onAnswerSelect(index: number) {
		this.answer.setValue(this.getKey(index))
	}

	async onSubmit() {
		const choices: Choices = {
			'A': this.choices.value[0]!,
			'B': this.choices.value[1]!,
			'C': this.choices.value[2]!,
			'D': this.choices.value[3]!,
		}

		await this.questionsService.addMultipleChoiceQuestion(QuestionsService.createMultipleChoiceQuestion({
			question: this.question.value!,
			subject: this.subject!.toLowerCase(),
			tags: (this.tags as string[]).map(s => s.toLowerCase()),
			explaination: this.explaination.value!,
			answer: this.answer.value!,
			choices: choices
		}))

		this.submission.emit();
	}

	onReset(...elements: HTMLTextAreaElement[]) {
		this.form.reset();

		this.formReset.emit();

		elements.forEach(element => {
			element.style.height = "",
			element.innerHTML = "";
		});
	}

	getKey(index: number) {
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

		throw new Error("key not found");
	}

	get question() {
		return this.form.controls.question;
	}

	get answer() {
		return this.form.controls.answer;
	}

	get explaination() {
		return this.form.controls.explaination;
	}

	get choices() {
		return this.form.controls.choices;
	}

}
