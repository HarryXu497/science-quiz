import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/question.model';
import { AnswerStateService } from '../answer-state.service';
import { BalancingChemicalEquationsQuestion } from '../../../../question.model';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { sleep } from 'src/app/utils';

interface IForm {
	reactants: FormArray<FormControl<number | null>>;
	products: FormArray<FormControl<number | null>>;
}

@Component({
  selector: 'app-balancing-chemical-equations',
  templateUrl: './balancing-chemical-equations.component.html',
  styleUrls: ['./balancing-chemical-equations.component.scss']
})
export class BalancingChemicalEquationsComponent implements OnInit {
	constructor(
		public answerStateService: AnswerStateService,
		private fb: FormBuilder,
	) {}

	@Input() waitFor: number = 2000;
	@Input("question") _question!: Question;
	question!: BalancingChemicalEquationsQuestion;
	
	form!: FormGroup<IForm>;
	
	
	ngOnInit(): void {
		this.form = this.fb.group({
			reactants: this.fb.array([] as (number | null)[]),
			products: this.fb.array([] as (number | null)[])
		})

		for (let i = 0; i < this.question.reactants.length; i++) {
			this.reactants.push(
				this.fb.control(null as number | null, [Validators.required, Validators.min(1)])
			)
		} 

		for (let i = 0; i < this.question.products.length; i++) {
			this.products.push(
				this.fb.control(null as number | null, [Validators.required, Validators.min(1)])
			)
		} 
	}
		
	ngOnChanges(changes: SimpleChanges) {
		this.question = (<unknown> changes["_question"].currentValue) as BalancingChemicalEquationsQuestion;
	}

	async onSubmit() {
		const inputs = [...this.reactants.value, ...this.products.value]

		const valid = inputs.every((val, idx) => {
			return val === this.question.answers[idx];
		})

		if (valid) {
			this.answerStateService.setState('correct');
		}
		if (!valid) {
			this.answerStateService.setState('incorrect');
		}

		await sleep(this.waitFor);
		this.answerStateService.setShow('answer')
	}

	get products() {
		return this.form.controls.products;
	}

	get reactants() {
		return this.form.controls.reactants;
	}
}
