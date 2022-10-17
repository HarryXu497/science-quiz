import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubscriptAndSuperscriptsDirective } from './shared/subscript-and-superscripts.directive';
import { QuizComponent } from './quiz/quiz.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubscriptAndSuperscriptsDirective,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule,

	// Firebase
	AngularFireModule.initializeApp(environment.firebase),
	AngularFirestoreModule,
	provideFirebaseApp(() => initializeApp(environment.firebase)),
	provideAuth(() => getAuth()),
	provideFirestore(() => getFirestore()),
	provideFunctions(() => getFunctions()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
