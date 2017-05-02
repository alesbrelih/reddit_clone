import { Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

//validates if equal to pws
//abstract control represents formgroup/formcontrol/etc
function validateEqual(c:AbstractControl){
  return c.get('password').value === c.get('confirm').value ? null : {'passwords don\'t match ': true};
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm:FormGroup;
  jwt: String;

  constructor(private fb:FormBuilder, private auth:AuthService, private routeParams:ActivatedRoute) { }

  ngOnInit() {

    //get jwt from route
    this.routeParams.params.subscribe( prms => {
      if(prms['jwt']){
        this.jwt = prms['jwt'];
      }
    });

    this.changePasswordForm = this.fb.group({
      password:['', Validators.required],
      confirm: ['', Validators.required]
    }, {validator:validateEqual});
  }

  changePassword(){
    this.auth.changePassword(this.changePasswordForm.value,this.jwt);
  }

}
