import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignupService} from '../signup.service';
import {Player} from '../Player';
import { Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  @Input()
  players: Player[];

  public signupPage = this.fb.group( {
    username:   ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder, private signupService: SignupService) { }
  //, private router: Router    dit kan misschien in de constructor

  ngOnInit() {
  }

  public checkUser(event){
  this.signupService.findAll().subscribe(
    player => {
      this.players = player;
      var gevonden : boolean;
      gevonden = false;
      for (let x= 0; x < this.players.length; x++) {
        if (this.players[x].username == this.signupPage.controls['username'].value) {
          gevonden = true;
          console.log("MAG NIET!!! ALARM!!!!");
          break;
        }
      }
      if (!gevonden) {
        console.log("Niet gevonden!");
        this.saveNewUser()
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
    subscribe()
    console.log("Signup complete");
  }

}
