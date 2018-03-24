import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
	AuthGuardService as AuthGuard
} from './services/auth-guard.service';

const routes: Routes = [{
		path: 'auth',
		loadChildren: 'app/components/auth/auth.module#AuthModule'
	}, {
		path: 'home',
		loadChildren: 'app/components/home/home.module#HomeModule',
		canActivate: [AuthGuard]
	}, {
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
