import { Component, Input, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Player} from '../Player';
import { Router} from '@angular/router';
import {PopupService} from '../popup.service';
import {BokemonService} from '../bokemon.service';
import {Bokemon} from '../bokemon';
import {AuthenticationService} from "../authentication.service";

// import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [LoginService, PopupService]

})
export class LoginPageComponent implements OnInit {

  @Input()
  loginpage: LoginPageComponent;

  public loginPage = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder,
              private loginService: LoginService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  public onLogin(event) {
    // Get username and password from login forms
    const username = this.loginPage.controls['username'].value;
    const password = this.loginPage.controls['password'].value;

    // Attempt to log in
    this.authenticationService.login(username, password);

    if (this.authenticationService.currentPlayer) {
      window.alert('current player: ' + this.authenticationService.currentPlayer.username);
      this.router.navigate(['world-view'])
    } else {
      window.alert('username and password not found');
    }
  }

  //
  // public verifyUser (event) {
  //   const username = this.loginPage.controls['username'].value;
  //   const password = this.loginPage.controls['password'].value;
  //   const world = 8;
  //   const sprite = "https://i.imgur.com/iwnZWVy.png";
  //   const x = 3;
  //   const y = 0;
  //   const wildBokemon = "";
  //
  //   this.loginService.authenticate(new Player(0, username, password, world, sprite, x, y, wildBokemon)).subscribe( result => {
  //     console.log(result)
  //     if(result == true){
  //       console.log("HOI")
  //       localStorage.setItem("player", (this.loginPage.controls['username'].value).toString())
  //       console.log(localStorage.getItem("player"))
  //       window.alert("Current player is: " + localStorage.getItem("player"))
  //       this.router.navigate(['world-view'])
  //     }
  //     else {
  //       window.alert("Your username or password was incorrect, please try again.")
  //       // this.popup.showAsComponent("Your username or password was incorrect, please try again.")
  //       }
  //   })
  // }

  public goToSignup() {
    this.router.navigate(['signup'])
  }


}

