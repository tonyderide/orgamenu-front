import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardAdminComponent} from "./board-admin/board-admin.component";
import {BoardUserComponent} from "./board-user/board-user.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RecetteDetailComponent} from "./recette-detail/recette-detail.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AuthGuardService as AuthGuard} from "./shared/services/auth-guard.service";
import {RoleGuardService as RoleGuard} from "./shared/services/role-guard.service";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'recette/:id' , component : RecetteDetailComponent },
  { path: 'recette' , component : RecetteDetailComponent,
    canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'calendrier', component: CalendarComponent,
    canActivate: [AuthGuard]  },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard] },
  { path: 'user', component: BoardUserComponent,
    canActivate: [AuthGuard] },
  { path: 'admin', component: BoardAdminComponent,
    canActivate: [RoleGuard],
    data: {roleAttendu:["ROLE_USER", "ROLE_ADMIN"]}},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
