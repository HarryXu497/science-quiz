import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
	declarations: [
		AuthenticationComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AuthenticationRoutingModule,
	]
})
export class AuthenticationModule { }
