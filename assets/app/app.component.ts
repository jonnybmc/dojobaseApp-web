import { StudentService } from './students/student.service';
import { Component, Input } from '@angular/core';
import {Message} from './messages/message.model';
import { MessageService } from './messages/message.service';
import * as moment from 'moment';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls : ['./app.component.css'],
    providers: [MessageService, StudentService]
})
export class AppComponent {
}    