import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

interface IForm {
	reactants: FormArray<FormControl<string | null>>;
	products: FormArray<FormControl<string | null>>;
	answers: FormArray<FormControl<string | null>>;
	explaination: FormControl<string | null>;
	question: FormControl<string | null>;
}

@Component({
  selector: 'app-balancing-equations',
  templateUrl: './balancing-equations.component.html',
  styleUrls: ['./balancing-equations.component.scss']
})
export class BalancingEquationsComponent implements OnInit {
	constructor(private fb: FormBuilder) { }
	
	form!: FormGroup<IForm>;

	@Input() tags!: (string | null)[];
	@Input() subject!: string | null;
	
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
			answers: this.fb.array([] as (string | null)[])
		})
	}

	onSubmit() {

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

	get answers() {
		return this.form.controls.answers;
	}

}
