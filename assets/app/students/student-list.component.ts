import { Student } from './student.model';
import { StudentService } from './student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students:Student[];
  constructor(private studentService : StudentService) {
    this.students = [];
   }

  ngOnInit() {
    this.studentService.getStudents()
    .subscribe(
      (students:Student[]) =>{
          this.students = students;
          console.log(JSON.stringify(this.students,null,2));
      }
    );
  
  }

}
  