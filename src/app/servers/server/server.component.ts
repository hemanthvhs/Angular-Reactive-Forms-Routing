import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router, Params } from '@angular/router';
import { ServersModel } from 'src/app/shared/models/servers.model';
import { ServersService } from 'src/app/shared/services/servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
 
  server : ServersModel;

  constructor(private serversService:ServersService  ,private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id']
    this.server = this.serversService.getServerById(id)
    
    this.route.params.subscribe(
      (params :Params) => {
        this.server = this.serversService.getServerById(+params['id']);
       
      }
    )
  }

  onEdit(id:number) {
    this.router.navigate(["/servers",id,"edit"],{relativeTo:this.route})
  }

}
