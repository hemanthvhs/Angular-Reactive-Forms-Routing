import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormArray, Validators } from '@angular/forms';
import { CustomValidations } from '../shared/services/customvalidations.service';
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm  : FormGroup
  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.signupForm=this.formBuilder.group({
      username : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      password :['',Validators.required],
      confirmpassword :['',Validators.required],
      preferencetype :['',Validators.required],
      contactdetails : this.formBuilder.group({
        email :[''],
        confirmemail :[''],
        phone :[''],
      }),
      serverdetails : this.formBuilder.array([
        this.addserverDetailsFormGroup()]) 
    })

    this.signupForm.valueChanges.subscribe((data : any) => {
      this.logValidationMessagestoFormErrors(this.signupForm)
    })

    this.signupForm.get('preferencetype').valueChanges.subscribe((data : string) => {
      this.onPreferenceChange(data)
    })
  }

  ValidationMessages = {
    'username' : {'required'  : 'Username is required',
                  'minlength' : 'Minimum length  should be 2 characters',
                  'maxlength' :  'Maximum length should be 10 characters'},
    'password' : {'required'  : 'Password is required'},
    'confirmpassword' : {'required' : 'Confirm Password is required'},
    'preferencetype' : {'required' : 'Preference is required'},
    'contactdetails' : {'emailMismatch' : 'Confirm email is not same as Email provided'},
    'email' : {'required' : "Email is required",
               'emailValid' : 'Email Domain should be gmail.com'},
    'phone' : {'required' : 'Phone Number is required'},
    'confirmemail' : {'required' : 'Confirm Email is required'},
    'servername' : {'required' : 'Server Name is required'},
    'serverstatus' : {'required' : 'Server Status is required'}

  }

  FormErrors = {
    'username' : '',
    'password' :'',
    'confirmpassword' : '',
    'preferencetype' :'',
    'contactdetails' : '',
    'email' : '',
    'phone' :'',
    'confirmemail' :'',
    'servername' :'',
    'serverstatus' :''
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

  onPreferenceChange(preference) {
    const emailControl = this.signupForm.controls.contactdetails.get('email')
    const confirmemailControl = this.signupForm.controls.contactdetails.get('confirmemail')
    const phoneControl = this.signupForm.controls.contactdetails.get('phone')

    emailControl.markAsUntouched();
    confirmemailControl.markAsUntouched();
    phoneControl.markAsUntouched();
   
    emailControl.patchValue('')
    confirmemailControl.patchValue('')
    phoneControl.patchValue('')

    emailControl.clearValidators();
    confirmemailControl.clearValidators();
    phoneControl.clearValidators();

    emailControl.updateValueAndValidity();
    confirmemailControl.updateValueAndValidity();
    phoneControl.updateValueAndValidity();



    if(preference === 'email') {
      emailControl.setValidators([Validators.required,CustomValidations.emailValidation])
      confirmemailControl.setValidators([Validators.required])
      this.signupForm.get('contactdetails').setValidators(CustomValidations.confirmEmailValidation)
      emailControl.updateValueAndValidity()
      confirmemailControl.updateValueAndValidity()
      this.signupForm.updateValueAndValidity()
    }
    
    if(preference === 'phone'){
      phoneControl.setValidators(Validators.required)
      phoneControl.updateValueAndValidity()
    }
    
    
  }

  addserverDetailsFormGroup() : FormGroup {
    return this.formBuilder.group({
      servername :['',Validators.required],
      serverstatus :['',Validators.required]
    })
  }


  onAddServerDetailsBtnClick() {
    (<FormArray>this.signupForm.get('serverdetails')).push(this.addserverDetailsFormGroup())
  }

  removeFormControl(index : number) {
    (<FormArray>this.signupForm.get('serverdetails')).removeAt(index);
  }

  onSignupBtnClick() {
    this.router.navigate(['/home'],{relativeTo:this.route})
  }

  onCancelBtnClick() {
    this.router.navigate(['/home'],{relativeTo:this.route})
  }

}
