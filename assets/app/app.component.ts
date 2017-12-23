import { StudentService } from './students/student.service';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls : ['./app.component.css'],
    providers: [StudentService]
})
export class AppComponent {
}    