import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { AdminComponent } from './admin.component';
import { InsertCustomerComponent } from './insert-customer/insert-customer.component';
import { RegisterUserComponent } from './register-user/register-user.component';


const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    {
      path: 'register', component: RegisterUserComponent, canActivate: [AuthGuard]
    },
    {
      path: 'insert-customer', component: InsertCustomerComponent, canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: 'insert-customer' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
