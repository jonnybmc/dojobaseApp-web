import { AuthService } from './auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
@Component({
    selector: 'app-signin',
    templateUrl:'signin.component.html'
})
export class SigninComponent{
    myForm : FormGroup;
    
        constructor(private authService : AuthService, private router: Router) {

        }
        onSubmit(){
            const user = new User(
                this.myForm.value.email,
                this.myForm.value.password
            );
            this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/students');
                },
                error => console.error(error)
            );
            // console.log(this.myForm);
            this.myForm.reset();
        }
        ngOnInit(){
            this.myForm = new FormGroup({
                 email: new FormControl(null,[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),  
                 password : new FormControl(null,Validators.required)
            });
        }
}