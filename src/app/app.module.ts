import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './compnants/home/home.component';
import { HeaderComponent } from './compnants/header/header.component';
import { FooterComponent } from './compnants/footer/footer.component';
import { AllCustomersComponent } from './compnants/all-customers/all-customers.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { CustomerDetailsComponent } from './compnants/customer-details/customer-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrancstionComponent } from './compnants/trancstion/trancstion.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AllCustomersComponent,
    CustomerDetailsComponent,
    TrancstionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
