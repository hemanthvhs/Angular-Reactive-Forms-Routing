import { Component, OnInit } from '@angular/core';
import { ServersService } from 'src/app/shared/services/servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersModel } from 'src/app/shared/models/servers.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidations } from 'src/app/shared/services/customvalidations.service';
import { CanComponentDeactivate } from 'src/app/shared/services/Guards/can-deactivate-guard.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit,CanComponentDeactivate {
 
  server : ServersModel
  editServerDetails : FormGroup
  changesSaved = false;

  canDeactivate() : Observable<boolean> | Promise <boolean> | boolean{
    if(!this.changesSaved  && (this.editServerDetails.get('serverstatus').pristine || this.editServerDetails.get('serverstatus').touched) ) {
      return confirm('Discard Changes ?')
    }
    else{
      return true
    }
  }

  constructor(private serversService:ServersService,private route:ActivatedRoute,
              private formBuilder : FormBuilder,private router : Router) { }

  ngOnInit() {

    const id = +this.route.snapshot.params['id']
    const server = this.serversService.getServerById(id);

    this.route.params.subscribe(
      (params : Params) => {
        this.server = this.serversService.getServerById(+params['id'])
      }
    )

 
   this.editServerDetails=this.formBuilder.group({
     servername :[''],
     serverstatus :['',CustomValidations.serverStatusChangeValidation]
   })

   this.editServerDetails.patchValue({servername : server.serverName,serverstatus : server.serverStatus})

   this.editServerDetails.get('serverstatus').valueChanges.subscribe((data : any ) => {
    this.logValidationMessagestoFormErrors(this.editServerDetails)
  })    
}

ValidationMessages  = {
  
  'serverstatus' : { 'serverStatusChange' : 'Update Server Status'},
  'editServerDetails' : { 'serverStatusChange' : 'Update Server Status'}
}

 FormErrors = {
  
  'serverstatus' : '',
  'editServerDetails' :''
 }

logValidationMessagestoFormErrors(group : FormGroup){

  console.log(group)
  Object.keys(group.controls).forEach((key) => {
    const AbstractControl = group.get(key)
    this.FormErrors[key] = ''
    const messages = this.ValidationMessages[key]
    for(const error in AbstractControl.errors){
    
      this.FormErrors[key] += messages[error] + ''
      console.log(this.FormErrors[key])
    } 
    if(AbstractControl instanceof FormGroup){
      this.logValidationMessagestoFormErrors(AbstractControl)
    }
    if(AbstractControl instanceof FormArray) {
      for(const control of AbstractControl.controls ) {
        if(control instanceof FormGroup){
          this.logValidationMessagestoFormErrors(control)
        }
      }
    }
  })
}

    onSave(){

    var serverName = this.editServerDetails.get('servername').value;
    var serverStatus = this.editServerDetails.get('serverstatus').value;

    if(this.editServerDetails.get('serverstatus').pristine && !this.editServerDetails.get('serverstatus').dirty){
      alert("Change server status to proceed")
      this.editServerDetails.setValidators(CustomValidations.serverStatusChangeValidation)
    }
    else {
      this.serversService.updateServerDetails( this.server.serverId,{serverName : serverName, newServerStatus : serverStatus})
      this.changesSaved = true;
      this.router.navigate(["/servers",this.server.serverId],{relativeTo:this.route})
    }
    }

    onCancel(){
      this.router.navigate(["/servers",this.server.serverId])
    }
    
  }
