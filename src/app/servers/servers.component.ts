import { Component, OnInit } from '@angular/core';
import { ServersService } from '../shared/services/servers.service';
import { ServersModel } from '../shared/models/servers.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  servers:ServersModel[]=[];

  constructor(private serversService : ServersService) { }

  ngOnInit() {
  this.servers = this.serversService.getServers();
  }

}
