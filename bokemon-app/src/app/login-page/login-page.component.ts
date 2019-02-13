import { Component, Input, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Player} from '../Player';

// import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [LoginService]

})
export class LoginPageComponent implements OnInit {

  @Input()
  loginpage: LoginPageComponent;

  public loginPage = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit() {
  }

  public verifyUser (event) {
    const username = this.loginPage.controls['username'].value;
    const password = this.loginPage.controls['password'].value;

    this.loginService.verifyUser(username, password)
  }

}
