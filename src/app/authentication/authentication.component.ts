import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent  {

	constructor(private auth: AuthenticationService) { }

	async logInWithGooglePopup() {
		await this.auth.signInWithGooglePopup();
	}

	async signOut() {
		await this.auth.signOut();
	}

}
