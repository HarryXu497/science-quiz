import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGridComponent } from './card-grid/card-grid.component';
import { NewCardComponent } from './new-card/new-card.component';
import { NewCardGuard } from './new-card/new-card.guard';

const routes: Routes = [
	{ path: '', component: CardGridComponent },
	{ path: 'new', component: NewCardComponent, canActivate: [NewCardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
