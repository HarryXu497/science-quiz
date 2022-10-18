import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirebaseError } from '@angular/fire/app';

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
	message: string | null = null;

	ngOnInit() {
		this.route.data.subscribe(data => this.mode = data["authMode"]);

		this.form = this.fb.group({
			email: [null as string | null, Validators.required],
			password: [null as string | null, Validators.required],
		})
	}

	async onSubmit() {
		if (this.email.value === null || this.password.value === null) throw new Error("Email and password must be provided");

		try {
			if (this.mode === 'sign-in') {
				await this.auth.signInWithEmailAndPassword(this.email.value, this.password.value);
			}
			if (this.mode === 'sign-up') {
				await this.auth.signUpWithEmailAndPassword(this.email.value, this.password.value);
			}
		}
		catch (_error: unknown) {
			const error = _error as FirebaseError;
			this.message = this.matchErrorMessage(error);
		}

		this.form.reset();
	}

	private matchErrorMessage(error: FirebaseError): string {
		console.log(error.code)
		switch (error.code) {
			case 'auth/invalid-email': {
				return "The email is badly formatted.";
			}
			case 'auth/user-not-found': {
				return "There is no user record corresponding to this identifier.";
			}
			case 'auth/wrong-password': {
				return "The password is invalid or the user does not have a password.";
			}
		}


		return error.message;
	}


	async signInWithGooglePopup() {
		await this.auth.signInWithGooglePopup();
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
