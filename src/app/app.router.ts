import { Route, Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { DocumentContainerComponent } from './document-container/document-container.component';

const routes: Routes = [
    { path: '', component: AppComponent, children: [
        { path: 'signup', component: SignUpComponent },
        { path: 'signin', component: SignInComponent },
        { path: 'projects', component: ProjectContainerComponent },
        { path: 'documents', component: DocumentContainerComponent }
    ] }
];

export const appRoutes = RouterModule.forRoot(routes);