import { StudentService } from './student.service';
import { Student } from './student.model';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './../modal/modal.service';
import { NgForm } from '@angular/forms';

@Component({
    selector : 'app-studentDetails',
    templateUrl : './student-details.component.html',
    styleUrls : ['./student-details.component.css']
})

export class StudentDetails implements OnInit, OnDestroy {
    id: string;
    sub:any;
    student:Student;
    age: number;
    bodyText:string;
    constructor(private route : ActivatedRoute, private studentService : StudentService, private modalService : ModalService) {   
    }
    ngOnInit() {
        this.bodyText = 'This text can be updated in modal 1';
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.studentService.getStudent(this.id).subscribe(
      (student) =>{
          this.student = student;
      }
    );
    console.log(this.student);
   
    }

    onSubmit(form:NgForm) {
        
            this.student.firstName = form.value.firstName;
            this.student.lastName = form.value.lastName;
            this.student.gender = form.value.gender;
            this.student.contactNumber = form.value.contactNumber;
            this.student.email = form.value.email;
            this.student.dateOfBirth = form.value.dateOfBirth;
            this.student.streetAddress = form.value.streetAddress;
            this.student.city = form.value.city;
            this.student.zipCode = form.value.zip;
            this.student.rank = form.value.rank;

            this.studentService.updateStudent(this.student)
                .subscribe(
                    (student:Student) => {
                        this.student = student;
                    }
                );
        }

      
 

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id : string,e) {
        e.stopPropagation();
        this.modalService.close(id);
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}