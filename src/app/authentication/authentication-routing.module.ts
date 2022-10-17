import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
	{ path: 'sign-in', component: AuthenticationComponent, data: { authMode: 'sign-in' } },
	{ path: 'sign-up', component: AuthenticationComponent , data: { authMode: 'sign-up' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
