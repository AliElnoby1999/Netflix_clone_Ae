import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowesComponent } from './pages/browes/browes.component';
import { MovieCursolComponent } from './shared/components/movie-cursol/movie-cursol.component';
import { DetailsComponent } from './pages/details/details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './pages/footer/footer.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { MylistComponent } from './pages/mylist/mylist.component';
import { TvshowComponent } from './pages/tvshow/tvshow.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewspopularComponent } from './pages/newspopular/newspopular.component';
import { AuthgurdComponent } from './pages/authgurd/authgurd.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    LoginComponent,
    BrowesComponent,
    MovieCursolComponent,
    DetailsComponent,
    FooterComponent,
    FeaturedComponent,
    MylistComponent,
    TvshowComponent,
    NewspopularComponent,
    AuthgurdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
