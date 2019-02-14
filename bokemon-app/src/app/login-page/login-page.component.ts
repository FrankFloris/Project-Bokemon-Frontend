import { Component, Input, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Player} from '../Player';
import { Router} from '@angular/router';

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

  constructor(public fb: FormBuilder, private loginService: LoginService, private router: Router) {}

  ngOnInit() {
  }

  public verifyUser (event) {
    const username = this.loginPage.controls['username'].value;
    const password = this.loginPage.controls['password'].value;
    const world = 8;
    const sprite = "https://";
    const x = 0;
    const y = 0;

    this.loginService.authenticate(new Player(0, username, password, world, sprite, x, y)).subscribe( result => {
      console.log(result)
      if(result == true){
        console.log("HOI")
        this.router.navigate(['world-view'])
      }
      // else {router}
    })
  }

}
