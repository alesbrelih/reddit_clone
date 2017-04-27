import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, AbstractControl, FormGroup, Validators } from "@angular/forms";

//validates if equal to pws
//abstract control represents formgroup/formcontrol/etc
function validateEqual(c:AbstractControl){
  return c.get('registerInfo.password').value === c.get('confirm').value ? null : {'passwords don\'t match ': true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //register form
  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private Auth:AuthService) {
    this.registerForm = this.formBuilder.group({
      registerInfo : this.formBuilder.group({
        username:['', Validators.required],
        email:['', Validators.required],
        password:['', Validators.required]
      }),
      confirm:['', Validators.required]
    },{validator:validateEqual});
   }

  ngOnInit() {

  }

  //submit
  register = () => {
    this.Auth.register(this.registerForm.value);
  }
}
