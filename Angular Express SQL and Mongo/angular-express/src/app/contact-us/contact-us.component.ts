import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendServiceService } from '../backend-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactList:any=[];
  // data: any;
  expresponse:string="";
  
  constructor(private http:HttpClient,private bservice:BackendServiceService){
  }
  getAllContacts(){
   this.contactList=this.bservice.getAllContacts()
  }
  updateContact(cdata:any){
    this.bservice.updateContact(cdata)
  }

  addContact(cdata:any){
    this.expresponse=this.bservice.addContact(cdata);
  }
  deleteContact(cdata: any) {
    this.bservice.deleteContact(cdata);
  }

}
