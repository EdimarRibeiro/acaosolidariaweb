import { BrowserModule } from '@angular/platform-browser';
import { Injector } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule, MatSnackBarModule, MatGridListModule, MatDividerModule, MatCardModule, MatButtonModule, MatSidenavModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule, MatInputModule } from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { FacebookModule } from 'ngx-facebook';

import { FlexLayoutModule } from "@angular/flex-layout";
//services
import { UtilService } from './services/util.service';
import { CookieService } from 'ngx-cookie-service';

//models
import { Usuario } from './models/usuario.model';
// import { Model } from './models/model';
//guards
import { ApiGuard } from './guards/api.guard';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { ProfileComponent } from './components/usuario/profile/profile.component';
import { EntidadeCreateComponent } from './components/entidade/entidade-create/entidade-create.component';
import { EntidadeListComponent } from './components/entidade/entidade-list/entidade-list.component';
import { EntidadeUpdateComponent } from './components/entidade/entidade-update/entidade-update.component';
import { DialogDefaultComponent } from './components/dialogs/dialog-default/dialog-default.component';
import { DialogRemoveComponent } from './components/dialogs/dialog-remove/dialog-remove.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    UsuarioListComponent,
    ProfileComponent,
    EntidadeCreateComponent,
    EntidadeListComponent,
    EntidadeUpdateComponent,
    DialogDefaultComponent,
    DialogRemoveComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    FacebookModule.forRoot(),
    FlexLayoutModule,
    MatSidenavModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogDefaultComponent,
    DialogRemoveComponent,
  ],
  providers: [
    UtilService,
    CookieService,
    ApiGuard,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { //https://stackoverflow.com/questions/39101865/angular-2-inject-dependency-outside-constructor
  constructor(injector: Injector) {
    AppInjector = injector;
  }
}
export let AppInjector: Injector;
