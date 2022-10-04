import { Component, OnInit } from '@angular/core';
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
	
	form!: FormGroup<IForm>
	
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

}
