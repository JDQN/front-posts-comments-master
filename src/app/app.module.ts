import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';


//Componentes
import { AppComponent } from './app.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


//Libreria primeNG Config
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { InputTextModule } from "primeng/inputtext";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from "primeng/badge";
import { ChipModule } from "primeng/chip";
import { AccordionModule } from 'primeng/accordion';
import { RippleModule } from 'primeng/ripple';
import { TableModule} from 'primeng/table';


//Componentes Angular Material 
import { NavBarComponent } from './navBar/navBar.component';
import { FooterComponent } from './footer/footer.component';
import { PostFavoriteComponent } from './post-favorite/post-favorite.component';
import { HistoricoComponent } from './historico/historico.component';
import { CanalesComponent } from './canales/canales.component';



@NgModule({
  declarations: [	
    AppComponent,
    PostsPageComponent,
    PostDetailComponent,
    LoginComponent,
    RegisterComponent,
      NavBarComponent,
      FooterComponent,
      PostFavoriteComponent,
      HistoricoComponent,
      CanalesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    InputTextModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    InputTextareaModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    ListboxModule,
    ToastModule,
    FieldsetModule,
    AvatarModule,
    ImageModule,
    DividerModule,
    ScrollPanelModule,
    ProgressBarModule,
    BadgeModule,
    ChipModule,
    AccordionModule,
    RippleModule,
    TableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
