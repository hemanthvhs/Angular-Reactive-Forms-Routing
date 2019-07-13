import { FormControl, AbstractControl } from '@angular/forms';

export class CustomValidations {
    static  serverStatusChangeValidation(control : AbstractControl):{[key:string]:any} | null {
        if(control.touched || control.pristine)
        {
            
            return {serverStatusChange : true}
        }
        else 
        { 
            null 
        }
    }

    static emailValidation(control : AbstractControl): {[key:string]:any} | null {
       const email =  control.value
       const emailDomain = email.substring(email.lastIndexOf('@')+1)
       if(emailDomain.toLowerCase() === 'gmail.com' || email === '') {
           return null
       }
       else {
           return { emailValid : true}
       }
       
    }

    static confirmEmailValidation(group : AbstractControl) : {[key:string] : any } | null {
        const email = group.get('email').value
        const confirmEmail = group.get('confirmemail').value

        if(email.toLowerCase() === confirmEmail.toLowerCase() || confirmEmail === '') {
            return null
        }
        else {
            
            return { emailMismatch : true}
        }
    }
}