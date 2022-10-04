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
	constructor(public router: Router, private qs: QuestionsService) { }

	onClick() {
		this.qs.addBalancingChemicalEquationQuestion(QuestionsService.createBalancingChemicalEquationQuestion({
			explaination: `
				It works!!`,
			tags: ["chemistry", "balancing-equations"],
			subject: "chemistry",
			answers: [2, 3, 2],
			question: "What is the balanced equation of $Fe + Cl_2 \\rightarrow FeCl_3$?",
			reactants: [
				"$Fe$",
				"$Cl_2$",
			],
			products: [
				"$FeCl_3$"
			],
			reactionType: 'yields'
		}))
	}
}
