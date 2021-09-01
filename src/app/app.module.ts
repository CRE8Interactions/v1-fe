import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors/index';
import { ApiService } from './config/api.service';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AddressComponent } from './address/address.component';
import { DocsComponent } from './docs/docs.component';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GenreComponent } from './genre/genre.component';
import { GenresComponent } from './genres/genres.component';
import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { LoginComponent } from './login/login.component';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { NavComponent } from './components/nav/nav.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSubHeaderComponent } from './components/profile-sub-header/profile-sub-header.component';
import { PurchaseShowComponent } from './purchase-show/purchase-show.component';
import { QuickMerchComponent } from './components/quick-merch/quick-merch.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { MerchComponent } from './components/merch/merch.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SignupComponent } from './signup/signup.component';
import { SupportComponent } from './support/support.component';
import { MyShowsComponent } from './my-shows/my-shows.component';
import { LiveNowComponent } from './live-now/live-now.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AddressComponent,
    ArtistProfileComponent,
    DocsComponent,
    ForgotPasswordComponent,
    GenresComponent,
    HomeComponent,
    InvoicesComponent,
    LoginComponent,
    LoginSecurityComponent,
    PersonalDetailsComponent,
    ProfileComponent,
    ProfileSubHeaderComponent,
    MerchComponent,
    MyProfileComponent,
    FooterComponent,
    NavComponent,
    NewsletterComponent,
    PurchaseShowComponent,
    QuickMerchComponent,
    SignupComponent,
    SupportComponent,
    TicketComponent,
    MyShowsComponent,
    LiveNowComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
