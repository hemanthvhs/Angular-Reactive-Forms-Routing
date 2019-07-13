import { ServersModel } from '../models/servers.model';

export class ServersService {
    servers : ServersModel[] = [{
        serverId : 1,
        serverName :'Dev Server',
        serverStatus : 'Offline'
    },
    {
        serverId : 2,
        serverName :'QA Server',
        serverStatus : 'Online'
    },
    {
        serverId : 3,
        serverName :'Prod Server',
        serverStatus : 'Online'
    }];

    getServers() {
        return this.servers;
    }

    getServerById(id:number) {
        
        const server = this.servers.find(
            (s) => {
                console.log(s);
                return  s.serverId === id
            });
           
        return server;
    }

    updateServerDetails(id:number, serverInfo : {serverName : string , newServerStatus : string}) {
        const server = this.servers.find(
            (s) => {
                return s.serverId === id 
            })
        if(server)
        {
            server.serverName = serverInfo.serverName;
            server.serverStatus = serverInfo.newServerStatus;
        }          
    }
}