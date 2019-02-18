import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignupService} from '../signup.service';
import {Player} from '../Player';
import { Router} from '@angular/router';
import {PopupService} from '../popup.service';
import {LoginService} from '../login.service';
// import {start} from 'repl';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService, PopupService]
})
export class SignupComponent implements OnInit {

  @Input()
  players: Player[];

  public signupPage = this.fb.group( {
    username:   ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder, private signupService: SignupService,
              private router: Router, private popup: PopupService) { }
  //, private router: Router    dit kan misschien in de constructor

  ngOnInit() {
  }

  public checkUser(event){
  this.signupService.findAll().subscribe(
    player => {
      this.players = player;
      var gevonden : boolean;
      gevonden = false;
      console.log("TEST")
      for (let x= 0; x < this.players.length; x++) {
        if (this.players[x].username == this.signupPage.controls['username'].value) {
          gevonden = true;
          console.log("MAG NIET!!! ALARM!!!!");
          window.alert("This username is not available, please choose a different username")
          // this.popup.showAsComponent("This username is not available, please choose a different username")
          // this.popup.showAsElement(<button>);
          break;
        }
      }
      if (!gevonden) {
        console.log("Niet gevonden!");
        this.saveNewUser();
        localStorage.setItem("player", (this.signupPage.controls['username'].value))
      }
  })
  }

  public saveNewUser() {

    const username = this.signupPage.controls['username'].value;
    const password = this.signupPage.controls['password'].value;
    const world = 8;
    const sprite = "https:/"
    const x = 0;
    const y = 0;

    this.signupService.saveUser(new Player( 0, username, password, world, sprite, x, y)).
    subscribe(player =>{
      console.log("Signup complete");
      this.router.navigate(['world-view']);
      // DIT MOET NOG WORDEN AANGEPAST NAAR WORLD VIEW
      }
      );
    
    
  }

  goToLogin() {
    this.router.navigate(['login-page'])
  }
}
