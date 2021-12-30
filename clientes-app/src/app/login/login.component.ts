import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

    userName?: string;
    passWord?: string;
    loginError?: boolean;

  constructor() { }

  onSubmit(){
      console.log(`User: ${this.userName}, Pass: ${this.passWord}`);
  }
}
