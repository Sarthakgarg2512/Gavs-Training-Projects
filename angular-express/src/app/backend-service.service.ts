import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  title = 'reactive-forms';
  userList:any=[];
  contactList:any=[];
  data: any;
  expresponse:string="";

  constructor(private http:HttpClient){
  }
  getAllUsers(){
    this.http.get('http://localhost:9901/getAll').subscribe((response)=>
    {
      this.userList=response;
      console.log(this.userList)
    });
    return this.userList;

  }
  updateUser(udata:any){
    const userid=udata.value.userid;
    this.http.put('http://localhost:9901/update/'+userid,udata.value).subscribe((response)=>
    {
      console.log(response)
    });
  }

  addUser(udata:any):any{
    // console.log(udata)
    // console.log(udata.value)
    // this.userList.push(udata.value);
    
    this.http.post('http://localhost:9901/insert',udata.value).subscribe((response)=>{
      this.expresponse=response.toString();
      
    });
    return this.expresponse;
  }
  deleteUser(udata: any) {
    const userid = udata.value.userid;
    this.http.delete('http://localhost:9901/delete', {body: { userid },}).subscribe((response) => {
        console.log(response);
      });
  }

  //For Contacts
  getAllContacts(){
    this.http.get('http://localhost:9901/getAllContacts').subscribe((response)=>
    {
      this.contactList=response;
      console.log(this.contactList)
    });
    return this.contactList;

  }
  updateContact(cdata:any){
    const SNo=cdata.value.SNo;
    this.http.put('http://localhost:9901/updateContact/'+SNo,cdata.value).subscribe((response)=>
    {
      console.log(response)
    });
  }

  addContact(cdata:any):any{

    this.http.post('http://localhost:9901/insertContact',cdata.value).subscribe((response)=>{
      this.expresponse=response.toString();
      
    });
    return this.expresponse;
  }
  deleteContact(cdata: any) {
    const SNo = cdata.value.SNo;
    this.http.delete('http://localhost:9901/deleteContact', {body: { SNo },}).subscribe((response) => {
        console.log(response);
      });
    }
}
