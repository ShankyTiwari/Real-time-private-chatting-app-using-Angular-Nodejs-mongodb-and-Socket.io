import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
	path: '',
	redirectTo: '/pages/authentication',
	pathMatch: 'full'
}, {
	path: 'pages',
	loadChildren: './pages/pages.module#PagesModule'
}, {
	path: '**',
	redirectTo: '/pages/authentication'
}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
