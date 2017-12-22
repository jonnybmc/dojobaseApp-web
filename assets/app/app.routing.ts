import { StudentDetails } from './students/student-details.component';
import { StudentsComponent } from './students/students.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import { AuthenticationComponent } from './auth/authentication.component';
import { MessagesComponent } from './messages/messages.component';
import { Routes, RouterModule } from '@angular/router';
import Overview from './students/overview.component';

const APP_ROUTES : Routes = [
    {path : '', redirectTo : '/messages', pathMatch: 'full'},
    {path : 'messages', component: MessagesComponent},
    {path : 'students', component : StudentsComponent},
    {path: 'students/:id', component: StudentDetails,
    children : [
        {path: '', redirectTo : 'overview', pathMatch : 'full'},
        {path : 'overview' , component: Overview}
    ]
},
    {path : 'auth', component: AuthenticationComponent, children:AUTH_ROUTES},
];

export const routing = RouterModule.forRoot(APP_ROUTES);