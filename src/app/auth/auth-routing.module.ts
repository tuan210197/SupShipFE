import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CheckemailComponent } from './checkemail/checkemail.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [{
  path: '', component: AuthComponent,
  children: [
    {
      path: 'login', component: LoginComponent,
    },
    {
      path: 'checkemail', component: CheckemailComponent,
    },


    { path: '**', redirectTo: 'checkemail' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
