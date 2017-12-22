import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from './student.model';
import { NgForm } from '@angular/forms';




@Component({
    selector: 'app-addStudent',
    templateUrl: './student-add.component.html',
    styleUrls : ['./student-add.component.css']
})

export class StudentAddComponent implements OnInit{
    studentDetails:Student;
    private fileReader : FileReader;
    private base64encoded: string;
    image;

    constructor(private studentService : StudentService){
        
    }
    fileChange($event){
        this.readFile($event.target);
    }

    readFile(inputVal: any){
        let file:File = inputVal.files[0];
        let myReader:FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.image = myReader.result;
            console.log(this.image);
        }
       myReader.readAsDataURL(file);
       
    }

    onSubmit(form:NgForm) {
        if (this.studentDetails) {
            this.studentDetails.firstName = form.value.firstName;
            this.studentDetails.lastName = form.value.lastName;
            this.studentDetails.gender = form.value.gender;
            this.studentDetails.contactNumber = form.value.contactNumber;
            this.studentDetails.email = form.value.email;
            this.studentDetails.dateOfBirth = form.value.dateOfBirth;
            this.studentDetails.streetAddress = form.value.streetAddress;
            this.studentDetails.city = form.value.city;
            this.studentDetails.zipCode = form.value.zip;
            this.studentDetails.rank = form.value.rank;
            this.studentDetails.avatarSrc = this.image;

            this.studentService.updateStudent(this.studentDetails)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
                this.studentDetails = null;
        }
        else {
            const studentDetails = new Student(
                form.value.firstName,
                form.value.lastName,
                form.value.gender,
                form.value.dateOfBirth,
                form.value.streetAddress,
                form.value.city,
                form.value.zip,
                form.value.rank,
                form.value.contactNumber,
                form.value.email,
                this.image
            );
            this.studentService.addStudent(studentDetails)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
        form.resetForm();
    }

    ngOnInit(){
    }
}