import { AuthService } from './../../../services/auth.service';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm:FormGroup;
  responseText:string;
  emailSent:boolean = false;

  constructor(private fb:FormBuilder, private auth:AuthService) {

    this.forgotForm = this.fb.group({
      email:['',Validators.required]
    });

  }

  ngOnInit() {
  }

  sendRecoverToEmail = () => {
    this.auth.recoverPassword(this.forgotForm.value,(success)=>{
      this.responseText = JSON.parse(success._body).msg;
      this.emailSent = true;
    });

  }

}
