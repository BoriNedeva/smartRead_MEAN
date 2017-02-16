import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'ng2-bootstrap/alert';
import { RatingModule } from 'ng2-bootstrap/rating';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/not-found.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { AuthGuard } from './guards/auth.guard'
import { AuthenticationService } from './services/authentication.service';
import { ActionsService } from './services/actions.service';
import { OffersComponent } from './offers/offers.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ResultThumbnailsComponent } from './shared/result-thumbnails/result-thumbnails.component';
import { RecommendationsBlockComponent } from './recommendations/recommendations-block/recommendations-block.component';

import './rxjs-extensions';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    AlertModule.forRoot(),
    RatingModule.forRoot()
    ],
  declarations: [AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PageNotFoundComponent,
    SearchBookComponent,
    OffersComponent,
    RecommendationsComponent,
    ResultThumbnailsComponent,
    RecommendationsBlockComponent
  ],
  providers: [AuthGuard,
  AuthenticationService,
  ActionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
