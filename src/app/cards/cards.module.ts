import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MathjaxModule } from 'mathjax-angular';
import { CardGridComponent } from './card-grid/card-grid.component';
import { BalancingChemicalEquationsComponent } from './card-grid/card/balancing-chemical-equations/balancing-chemical-equations.component';
import { CardComponent } from './card-grid/card/card.component';
import { CheckboxCardComponent } from './card-grid/card/checkbox-card/checkbox-card.component';
import { MultipleChoiceCardComponent } from './card-grid/card/multiple-choice-card/multiple-choice-card.component';
import { CardsRoutingModule } from './cards-routing.module';
import { BalancingEquationsComponent } from './new-card/balancing-equations/balancing-equations.component';
import { CheckboxComponent } from './new-card/checkbox/checkbox.component';
import { MultipleChoiceComponent } from './new-card/multiple-choice/multiple-choice.component';
import { NewCardComponent } from './new-card/new-card.component';



@NgModule({
  declarations: [
	CardComponent,
	CardGridComponent,
	MultipleChoiceCardComponent,
	CheckboxCardComponent,
 	BalancingChemicalEquationsComponent,
  	NewCardComponent,
	MultipleChoiceComponent,
	CheckboxComponent,
	BalancingEquationsComponent,
  ],
  imports: [
    CommonModule,
	CardsRoutingModule,
	ReactiveFormsModule,
	MathjaxModule.forRoot(),
  ]
})
export class CardsModule { }
