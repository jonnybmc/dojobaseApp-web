import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { StudentComponent } from './students/student.component';
import { Student } from './students/student.model';
import { StudentAddComponent } from './students/student-add.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { routing } from './app.routing';
import { HeaderComponent } from './header.component';
import { AuthenticationComponent } from './auth/authentication.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';

import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
import { StudentsComponent } from './students/students.component';
import { StudentListComponent } from './students/student-list.component';
import { StudentDetails } from './students/student-details.component';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        StudentComponent,
        StudentAddComponent,
        StudentsComponent,
        StudentListComponent,
        StudentDetails,
        ModalComponent,
        ErrorComponent
    ],
    providers: [
        ModalService,
        AuthService,
        ErrorService
    ],
    imports: [BrowserModule, FormsModule, routing,HttpModule,MomentModule, AuthModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}