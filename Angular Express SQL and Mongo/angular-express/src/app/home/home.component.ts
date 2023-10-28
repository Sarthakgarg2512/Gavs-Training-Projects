import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendServiceService } from '../backend-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'reactive-forms';
  userList:any=[];
  // data: any;
  expresponse:string="";
  
  constructor(private http:HttpClient,private bservice:BackendServiceService){
  }
  getAllUsers(){
   this.userList=this.bservice.getAllUsers()
  }
  updateUser(udata:any){
    this.userList=this.bservice.updateUser(udata);
  }

  addUser(udata:any){
    this.expresponse=this.bservice.addUser(udata);
  }
  deleteUser(udata: any) {
    this.userList=this.bservice.deleteUser(udata);
  }
}

