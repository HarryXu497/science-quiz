import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export type AuthMode = 'sign-in' | 'sign-up';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

	constructor(
		private auth: AuthenticationService,
		private route: ActivatedRoute,
	) { }

	mode!: AuthMode

	ngOnInit() {
		this.route.data.subscribe(data => this.mode = data["authMode"])
	}

	async logInWithGooglePopup() {
		await this.auth.signInWithGooglePopup();
	}

	async signOut() {
		await this.auth.signOut();
	}

}
