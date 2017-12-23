import { StudentDetails } from './students/student-details.component';
import { StudentsComponent } from './students/students.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES : Routes = [
    {path : '', redirectTo : '/students', pathMatch: 'full'},
    {path : 'students', component : StudentsComponent},
    {path: 'students/:id', component: StudentDetails},
    {path : 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);