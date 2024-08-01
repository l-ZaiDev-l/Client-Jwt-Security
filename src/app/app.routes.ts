import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
    { path: '', component: AuthenticateComponent },
    { path: 'home', component: HomeComponent,canActivate:[AuthGuardService] },
    { path: '**', redirectTo: '',pathMatch:'full' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
