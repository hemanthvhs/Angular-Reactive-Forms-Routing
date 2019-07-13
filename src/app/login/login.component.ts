import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { CustomValidations } from '../shared/services/customvalidations.service';
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm  : FormGroup
  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      username : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      password :['',Validators.required]
    })

    this.loginForm.valueChanges.subscribe((data : any) => {
      this.logValidationMessagestoFormErrors(this.loginForm)
  })
}

  ValidationMessages = {
    'username' : {'required'  : 'Username is required',
                  'minlength' : 'Minimum length  should be 2 characters',
                  'maxlength' :  'Maximum length should be 10 characters'},
    'password' : {'required'  : 'Password is required'}
  }

  FormErrors = {
    'username' : '',
    'password' :'',
  }
  
  logValidationMessagestoFormErrors(group : FormGroup) {
    Object.keys(group.controls).forEach( (key) => {
      const AbstractControl = group.get(key);
      this.FormErrors[key] =''
      if( !AbstractControl.valid && (AbstractControl.touched || AbstractControl.dirty)) {
        const messages = this.ValidationMessages[key];
        for(const error in AbstractControl.errors) {
         
          this.FormErrors[key] = messages[error] + ''
          console.log(this.FormErrors[key])
        }
      }

      if(AbstractControl instanceof FormGroup) {
        this.logValidationMessagestoFormErrors(AbstractControl)
      }

      if(AbstractControl instanceof FormArray) {
        for(const control of AbstractControl.controls ) {
          if(control instanceof FormGroup) {
            this.logValidationMessagestoFormErrors(control)
          }
        }
      }

    })
  }

  onLogin() {
    this.router.navigate(['/servers'],{relativeTo:this.route})
  }

  onCancel() {
    this.router.navigate(['/home'],{relativeTo:this.route})
  }
}
