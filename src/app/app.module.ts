import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './shared/helpers/ auth.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from "./shared/services/data.service";
import { ListeRecetteComponent } from './home/liste-recette/liste-recette.component';
import { RecetteDetailComponent } from './recette-detail/recette-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LineCalendrarComponent } from './calendar/line-calendrar/line-calendrar.component';
import { FlexLayoutModule} from "@angular/flex-layout";
import { IngredientsComponent } from './calendar/ingredients/ingredients.component';
import { SelectedRecettetodayComponent } from './calendar/selected-recettetoday/selected-recettetoday.component';
import { AuthGuardService } from "./shared/services/auth-guard.service";
import { RoleGuardService } from "./shared/services/role-guard.service";
import { ToastComponent } from './toast/toast.component';
import { AppInitService } from "./app-init.service.ts.service";
import { APP_INITIALIZER } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { PreferencesComponent } from './home/preferences/preferences.component';
import { AllergenesSelectComponent } from './profile/allergenes-select/allergenes-select.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EtapesDetailsComponent } from './recette-detail/etapes-details/etapes-details.component';
import { IngredientGlobalComponent } from './ingredient-global/ingredient-global.component';

//suppression des dates avant celle d'aujourdhui.
export function initializeApp(appInitService: AppInitService) {
  return (): void => {
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    NavbarComponent,
    FooterComponent,
    ListeRecetteComponent,
    RecetteDetailComponent,
    CalendarComponent,
    LineCalendrarComponent,
    IngredientsComponent,
    SelectedRecettetodayComponent,
    ToastComponent,
    LoadingComponent,
    PreferencesComponent,
    AllergenesSelectComponent,
    UpdateProfileComponent,
    EtapesDetailsComponent,
    IngredientGlobalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000,
      positionClass: 'toast-bottom-right',})
  ],
  providers: [authInterceptorProviders,
    DataService,
    AuthGuardService,
    RoleGuardService,
    AppInitService,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: APP_INITIALIZER,useFactory: initializeApp, deps: [AppInitService], multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule { }
