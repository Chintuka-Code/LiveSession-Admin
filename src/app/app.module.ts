import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { PrimengModule } from './SharedModule/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SharedUtilitiesModule } from './SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [AppComponent, PagenotfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedUtilitiesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
