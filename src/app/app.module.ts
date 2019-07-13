import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule,ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { ServersService } from './shared/services/servers.service';
import { CustomValidations } from './shared/services/customvalidations.service';
import { CanDeactivateGuard } from './shared/services/Guards/can-deactivate-guard.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


const appRoutes :Routes = [
  { path : '',redirectTo:'/home',pathMatch:'full'},
  { path : 'home',component:HomeComponent},
  {path: 'signup',component : SignupComponent},
  {path: 'login' ,component : LoginComponent},
  { path : 'signup' ,component : SignupComponent},
  { path : 'servers',component:ServersComponent,children : [
      { path : ':id' ,component:ServerComponent},
      { path : ':id/edit' , component:EditServerComponent , canDeactivate : [CanDeactivateGuard]},
    ]},
  { path : 'users',component:UsersComponent},
  { path : 'not-found' ,component : PagenotfoundComponent},
  { path : '**' , redirectTo : '/not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    EditServerComponent,
    ServerComponent,
    PagenotfoundComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [ServersService,CustomValidations,CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
