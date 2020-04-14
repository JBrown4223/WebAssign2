import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable} from "rxjs";
import { HttpClientModule } from "@angular/common/http";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './nav/nav.component';
import { ViewEnglishTermsComponent } from './view-english-terms/view-english-terms.component';
import { CreateEnglishTermComponent } from './create-english-term/create-english-term.component';
import { ViewTermDetailsComponent } from './view-term-details/view-term-details.component';
import { AddDefinitionComponent } from './add-definition/add-definition.component';
import { ViewNonEnglishTermsComponent } from './view-non-english-terms/view-non-english-terms.component';
import { ViewNonEnglishTermDetailsComponent } from './view-non-english-term-details/view-non-english-term-details.component';
import { CreateOtherTermComponent } from './create-other-term/create-other-term.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    NavbarComponent,
    ViewEnglishTermsComponent,
    CreateEnglishTermComponent,
    ViewTermDetailsComponent,
    AddDefinitionComponent,
    ViewNonEnglishTermsComponent,
    ViewNonEnglishTermDetailsComponent,
    CreateOtherTermComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
