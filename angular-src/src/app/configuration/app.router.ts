import { HomeComponent } from './../components/home/home.component';
import { ForgotPasswordComponent } from './../components/auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './../components/auth/register/register.component';
import { LoginComponent } from './../components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";

//define router
const appRoutes:Routes = [

    {

        path:'',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },{
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
]

//export default
@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRouting {}