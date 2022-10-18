import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'questions', loadChildren: () => import("./cards/cards.module").then(m => m.CardsModule)},
	{ path: 'quizzes', loadChildren: () => import("./cards/cards.module").then(m => m.CardsModule)}, // TODO: remove later
	{ path: 'auth', loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
