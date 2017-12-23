import { StudentService} from './student.service';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import {Student} from './student.model';

@Component({
   selector : 'app-student',
   templateUrl: './student.component.html' 
})
export class StudentComponent {
    @Input() student: Student;
    constructor(private studentService : StudentService) {

    }
    onDelete(){
        this.studentService.deleteStudent(this.student).subscribe(
            result => console.log(result),
            error => console.log(error)
        );
    }
    belongsToUser(){
        return localStorage.getItem('userId') == this.student.createdById;
    }
}




