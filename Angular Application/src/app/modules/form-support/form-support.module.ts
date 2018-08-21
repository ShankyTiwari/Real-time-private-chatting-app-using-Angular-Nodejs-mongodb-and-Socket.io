import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
	],
	declarations: [],
	exports: [
		ReactiveFormsModule,
	]
})
export class FormSupportModule { }
