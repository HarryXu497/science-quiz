import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { QuestionsService } from '../../../questions.service';

interface IForm {
	reactants: FormArray<FormControl<string | null>>;
	products: FormArray<FormControl<string | null>>;
	reactantAnswers: FormArray<FormControl<number | null>>;
	productAnswers: FormArray<FormControl<number | null>>;
	explaination: FormControl<string | null>;
	question: FormControl<string | null>;
}

@Component({
  selector: 'app-balancing-equations',
  templateUrl: './balancing-equations.component.html',
  styleUrls: ['./balancing-equations.component.scss']
})
export class BalancingEquationsComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private questionsService: QuestionsService,
		private renderer: Renderer2,
	) { }
	
	form!: FormGroup<IForm>;

	@Input() tags!: (string | null)[];
	@Input() subject!: string | null;

	@Output() formReset = new EventEmitter<void>();
	@Output() submission = new EventEmitter<void>();
	
	ngOnInit(): void {
		this.form = this.fb.group({
			explaination: [null as string | null, Validators.required],
			question: [null as string | null, Validators.required],
			reactants: this.fb.array([
				[null as string | null]
			]),
			products: this.fb.array([
				[null as string | null]
			]),
			reactantAnswers: this.fb.array([
				[null as number | null]
			]),
			productAnswers: this.fb.array([
				[null as number | null]
			]),
		})
	}

	onSubmit() {
		this.submission.emit();

		this.questionsService.addBalancingChemicalEquationQuestion(
			QuestionsService.createBalancingChemicalEquationQuestion({
				answers: [
					...this.reactantAnswers.value,
					...this.productAnswers.value,
				] as number[],
				products: this.products.value as string[],
				reactants: this.reactants.value as string[],
				reactionType: 'yields',
				question: this.question.value!,
				explaination: this.explaination.value!,
				tags: this.tags as string[],
				subject: this.subject!,
			})
		)
	}

	onReset(...elements: HTMLTextAreaElement[]) {
		this.form.reset();

		this.formReset.emit();

		elements.forEach(element => {
			element.style.height = "",
			element.innerHTML = "";
		});
	}

	addReactant() {
		this.reactants.push(
			this.fb.control(null as string | null)
		);
		this.addReactantAnswer();
	}

	addProduct() {
		this.products.push(
			this.fb.control(null as string | null)
		);
		this.addProductAnswer();
	}

	addReactantAnswer() {
		this.reactantAnswers.push(
			this.fb.control(null as number | null)
		);
	}
	
	addProductAnswer() {
		this.productAnswers.push(
			this.fb.control(null as number | null)
		);
	}

	onInput(element: HTMLTextAreaElement) {
		this.renderer.setStyle(element, "height", ``)
		this.renderer.setStyle(element, "height", `${element.scrollHeight}px`)
	}

	get explaination() {
		return this.form.controls.explaination;
	}

	get question() {
		return this.form.controls.question;
	}

	get products() {
		return this.form.controls.products;
	}

	get reactants() {
		return this.form.controls.reactants;
	}

	get reactantAnswers() {
		return this.form.controls.reactantAnswers;
	}

	get productAnswers() {
		return this.form.controls.productAnswers;
	}

}
