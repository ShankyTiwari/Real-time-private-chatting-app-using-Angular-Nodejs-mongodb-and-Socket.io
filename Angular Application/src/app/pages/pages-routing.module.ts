import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
	AuthGuardService as AuthGuard
} from './../services/auth-guard/auth-guard.service';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
	path: '',
	component: PagesComponent,
	children: [{
		path: '',
		redirectTo: 'authentication',
		pathMatch: 'full'
	}, {
		path: 'authentication',
		loadChildren: './authentication/authentication.module#AuthenticationModule'
	}, {
		path: 'home',
		loadChildren: './home/home.module#HomeModule',
		canActivate: [AuthGuard]
	}, {
		path: '**',
		redirectTo: 'home'
	}]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
