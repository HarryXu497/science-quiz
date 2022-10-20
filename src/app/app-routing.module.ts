import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent, pathMatch: 'full' },
	{ path: 'questions', loadChildren: () => import("./cards/cards.module").then(m => m.CardsModule)},
	{ path: 'quizzes', loadChildren: () => import("./quiz/quiz.module").then(m => m.QuizModule)},
	{ path: 'auth', loadChildren: () => import("./authentication/authentication.module").then(m => m.AuthenticationModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
