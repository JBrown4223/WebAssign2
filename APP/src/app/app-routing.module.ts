import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ViewEnglishTermsComponent} from './view-english-terms/view-english-terms.component';
import { CreateEnglishTermComponent} from  './create-english-term/create-english-term.component';
import { ViewTermDetailsComponent } from './view-term-details/view-term-details.component';
import { AddDefinitionComponent } from './add-definition/add-definition.component';
import { ViewNonEnglishTermsComponent } from './view-non-english-terms/view-non-english-terms.component';
import { ViewNonEnglishTermDetailsComponent } from './view-non-english-term-details/view-non-english-term-details.component';
import { CreateOtherTermComponent } from './create-other-term/create-other-term.component';




const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'contact', component: ContactComponent},
  {path:'viewEnglishTerms', component: ViewEnglishTermsComponent},
  {path:'addTerm', component: CreateEnglishTermComponent},
  {path:'viewEnglishTermDetail/:id', component: ViewTermDetailsComponent},
  {path:'addDefinition/:id', component: AddDefinitionComponent},
  //Other Terms Route
  {path:'viewNonEnglishTerms', component: ViewNonEnglishTermsComponent},
  {path:'viewNonEnglishDetail/:id', component: ViewNonEnglishTermDetailsComponent},
  {path:'addNonEnglishTerm/:id', component: CreateOtherTermComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
