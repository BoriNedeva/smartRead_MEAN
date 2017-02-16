import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { LoginFormComponent }   from './login-form/login-form.component';
import { RegisterFormComponent }   from './register-form/register-form.component';
import { PageNotFoundComponent }   from './page-not-found/not-found.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { OffersComponent } from './offers/offers.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/search-book', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'search-book', component: SearchBookComponent, canActivate: [AuthGuard]},
  { path: 'offers', component: OffersComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {


}
