import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { DetailsComponent } from './pages/details/details.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
 {path:'login',component:LoginComponent},
{path:'browse',component:BrowseComponent},
{ path: 'details/:id',component:DetailsComponent},
  { path: '**', redirectTo: '/login' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
