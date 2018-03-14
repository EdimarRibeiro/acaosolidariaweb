import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
//Auth
import { LoginComponent } from './components/auth/login/login.component';
//Guards
import { ApiGuard } from './guards/api.guard';
//Usuario
import { ProfileComponent } from './components/usuario/profile/profile.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
//Entidade
import { EntidadeCreateComponent } from './components/entidade/entidade-create/entidade-create.component';
import { EntidadeListComponent } from './components/entidade/entidade-list/entidade-list.component';
import { EntidadeUpdateComponent } from './components/entidade/entidade-update/entidade-update.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',           component: HomeComponent,pathMatch: 'full' },
  { path: 'login',          component: LoginComponent,pathMatch: 'full' },
  { path: 'register',       component: ProfileComponent,pathMatch: 'full' },
  { path: 'usuario/list',   component: UsuarioListComponent, canActivate:[ApiGuard], pathMatch: 'full' },
  { path: 'usuario/update/:identidade/:idusuario', component: UsuarioUpdateComponent, canActivate:[ApiGuard], pathMatch: 'full' },
  { path: 'usuario/create', component: UsuarioCreateComponent, canActivate:[ApiGuard], pathMatch: 'full' },
  
  { path: 'entidade/create',     component: EntidadeCreateComponent, canActivate:[ApiGuard], pathMatch: 'full' },
  { path: 'entidade/list',       component: EntidadeListComponent,   canActivate:[ApiGuard], pathMatch: 'full' },
  { path: 'entidade/update/:identidade', component: EntidadeUpdateComponent, canActivate:[ApiGuard], pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);