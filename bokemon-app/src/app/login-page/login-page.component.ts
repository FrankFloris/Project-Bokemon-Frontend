import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Player} from '../Player';
import { Router} from '@angular/router';
import {BokemonService} from '../bokemon.service';
import {Bokemon} from '../bokemon';
import {AuthenticationService} from "../authentication.service";

// import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: []

})
export class LoginPageComponent implements OnInit {

  @Input()
  loginpage: LoginPageComponent;

  public loginPage = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  public onLogin(event) {
    // Get username and password from login forms
    const username = this.loginPage.controls['username'].value;
    const password = this.loginPage.controls['password'].value;

    // Attempt to log in
    this.authenticationService.login(username, password).subscribe( player => {
      if (player) {
        window.alert('current player: ' + player.username);
        this.router.navigate(['world-view'])
      } else {
        window.alert('username and password not found');
      }
    });

    // if (this.authenticationService.currentPlayer) {
    //   window.alert('current player: ' + this.authenticationService.currentPlayer.username);
    //   this.router.navigate(['world-view'])
    // } else {
    //   window.alert('username and password not found');
    // }
  }

  public goToSignup() {
    this.router.navigate(['signup'])
  }


}

