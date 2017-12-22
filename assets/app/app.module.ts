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
import { MessagesComponent } from './messages/messages.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessageListComponent } from './messages/message-list.component';    

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MomentModule} from 'angular2-moment';

import { AppComponent } from "./app.component";
import { MessageComponent } from './messages/message.component';
import { HttpModule } from '@angular/http';
import { StudentsComponent } from './students/students.component';
import { StudentListComponent } from './students/student-list.component';
import { StudentDetails } from './students/student-details.component';
import Overview from './students/overview.component';
@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        StudentComponent,
        StudentAddComponent,
        StudentsComponent,
        StudentListComponent,
        StudentDetails,
        Overview,
        ModalComponent
    ],
    providers: [
        ModalService,
        AuthService
    ],
    imports: [BrowserModule, FormsModule, routing, ReactiveFormsModule,HttpModule,MomentModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}