import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { QuestionType } from './../../question.model';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface IForm {
	type: FormControl<QuestionType | null>;
	subject: FormControl<string | null>;
	tags: FormArray<FormControl<string | null>>;
}

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private router: Router,	
	) {}

	choices: QuestionType[] = ['multiple-choice', 'checkbox', 'balancing-chemical-equations']
	form!: FormGroup<IForm>;

	@ViewChild('tagsDisplay')
	tagsElement!: ElementRef<HTMLParagraphElement>;

	ngOnInit() {
		this.form = this.fb.group({
			type: [this.choices[0] as QuestionType | null],
			subject: [null as string | null, Validators.required],
			tags: this.fb.array([] as (string | null)[]),
		})
	}

	addTag(tag: HTMLInputElement) {
		this.tags.push(
			this.fb.control(tag.value)
		)
		tag.value = ""
	}

	onReset() {
		this.form.reset();
		this.tags.clear();
		this.form.controls.type.setValue(this.choices[0])
	}

	onSubmit() {
		this.router.navigate(["/questions"]);
	}

	get tags() {
		return this.form.controls.tags;
	}

	get formType() {
		return this.form.controls.type.value;
	}

	get subject() {
		return this.form.controls.subject;
	}
}
