import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, takeUntil } from 'rxjs';
import { Question } from '../../question.model';
import { QuestionsService } from '../../questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
  animations: []
})
export class CardGridComponent implements OnInit, OnDestroy {
	constructor(private questionsService: QuestionsService) {}
	
	onDestroy$: Subject<void> = new Subject();

	questions$: Observable<Question[]> | null = null;
	
	ngOnInit() {
		this.questions$ = this.questionsService.getQuestions().pipe(
			takeUntil(this.onDestroy$)
		);
	}

	ngOnDestroy() {
		this.onDestroy$.next();
	}
}
