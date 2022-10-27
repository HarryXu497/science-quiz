import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fader } from './route-animations';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
	fader("routeAnimations"),
  ]
})
export class AppComponent {
	constructor(public router: Router) { }
}
