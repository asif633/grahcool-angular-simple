import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApolloModule } from 'apollo-angular';

import { AppComponent } from './app.component';
import { provideClient } from './apollo-client';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { DocumentContainerComponent } from './document-container/document-container.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { appRoutes } from './app.router';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ProjectFormComponent,
    ProjectListComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    ProjectContainerComponent,
    DocumentContainerComponent,
    DocumentFormComponent,
    DocumentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.forRoot(provideClient),
    appRoutes
  ],
  providers: [ProjectService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
