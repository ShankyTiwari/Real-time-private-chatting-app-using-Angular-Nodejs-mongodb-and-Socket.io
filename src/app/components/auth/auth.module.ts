import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
	imports: [
		CommonModule,
		AuthRoutingModule,
		NgbModule.forRoot(),
		ReactiveFormsModule,
	],
	declarations: [
		AuthComponent
	]
})
export class AuthModule { }
