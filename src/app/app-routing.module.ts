import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './config/auth.guard';
import { AccountComponent } from './account/account.component';
import { AddressComponent } from './address/address.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { DocsComponent } from './docs/docs.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GenreComponent } from './genre/genre.component';
import { GenresComponent } from './genres/genres.component';
import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { LiveNowComponent } from './live-now/live-now.component';
import { LoginComponent } from './login/login.component';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseShowComponent } from './purchase-show/purchase-show.component';
import { SignupComponent } from './signup/signup.component';
import { SupportComponent } from './support/support.component';
import { MyShowsComponent } from './my-shows/my-shows.component';


const routes: Routes = [
  { path: 'artist-profile/:id', component: ArtistProfileComponent },
  { path: 'docs/:type', component: DocsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'genre/:type', component: GenreComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'purchase-show/:slug', component: PurchaseShowComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'support', component: SupportComponent },
  {
    path: 'account', component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'live-now/:slug', component: LiveNowComponent },
      { path: 'my-shows', component: MyShowsComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'address', component: AddressComponent },
          { path: 'invoices', component: InvoicesComponent },
          { path: 'personal-details', component: PersonalDetailsComponent },
          { path: 'login-security', component: LoginSecurityComponent },
          { path: 'my-profile', component: MyProfileComponent },
          { path: 'newsletter', component: NewsletterComponent }
        ]
      },
    ]
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
