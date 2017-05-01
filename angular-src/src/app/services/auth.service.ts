import { AppConstants } from './../configuration/app.constants';
import { User } from './../components/auth/user';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  user: User;

  constructor(private http:Http, private router:Router) {
    this.user = null;
  }

  /**Tries to register new user on the API endpoint using username and password */
  register = (registerObj) => {
    console.log(registerObj.registerInfo);
    return this.http.post(`${AppConstants.API_ENDPOINT}/users/register`,registerObj.registerInfo)
          .toPromise()
          .then(this.redirectToLogin)
          .catch(this.printErr);
  }

  /**Tries to login user using provided username and password */
  login = (username:string, password:string) => {
    return this.http.post(`${AppConstants.API_ENDPOINT}/users/login`, { 'username': username, 'password':password })
        .toPromise()
        .then(this.setUser)
        .catch(this.printErr);
  }

  /**Recover password */
  recoverPassword = (emailObj, cb) => {
    this.http.post(`${AppConstants.API_ENDPOINT}/users/recoverpassword`, emailObj)
      .toPromise()
      .then(cb)
      .catch(this.printErr);
  }

  //sets user if success
  private setUser = (data:Response)=>{
    if(data.status == 200){
      this.user = new User(data.json());

      this.router.navigate(['/home']);
    }
  }
  private printErr = (err:Response) => {
    console.log('err', err);
  }
  //redirect to login
  private redirectToLogin = (data) => {
    console.log(data);
    this.router.navigate(['/login']);
  }
  // show success after email sent
  private showEmailSent = (data) => {

  }
}
