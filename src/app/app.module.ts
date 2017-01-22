import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import { routing } from './app.routing';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { ItemsService } from './items/items.service';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { ItemsComponent } from './items/items.component';
import { SearchPipe} from './items/items.filterItem.pipe';



//Since RC6, all Directives and Pipes should be moved to module's declarations.



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    ItemsComponent,
    SearchPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthService,
    UserService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
