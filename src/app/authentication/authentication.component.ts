import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export type AuthMode = 'sign-in' | 'sign-up';

interface IForm {
	email: FormControl<string | null>;
	password: FormControl<string | null>;
}
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

	constructor(
		private auth: AuthenticationService,
		private route: ActivatedRoute,
		private fb: FormBuilder,
	) { }

	mode!: AuthMode
	form!: FormGroup<IForm>;

	ngOnInit() {
		this.route.data.subscribe(data => this.mode = data["authMode"]);

		this.form = this.fb.group({
			email: [null as string | null, Validators.required],
			password: [null as string | null, Validators.required],
		})
	}

	async onSubmit() {
		if (this.email.value === null || this.password.value === null) throw new Error("Email and password must be provided");

		await this.signInWithEmailAndPassword(this.email.value, this.password.value);
	}


	async signInWithGooglePopup() {
		await this.auth.signInWithGooglePopup();
	}

	async signInWithEmailAndPassword(email: string, password: string) {
		await this.auth.signInWithEmailAndPassword(email, password);
	}

	async signOut() {
		await this.auth.signOut();
	}


	get email() {
		return this.form.controls.email;
	}

	get password() {
		return this.form.controls.password;
	}
}
