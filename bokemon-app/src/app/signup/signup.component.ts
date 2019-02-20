import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignupService} from '../signup.service';
import {Player} from '../Player';
import { Router} from '@angular/router';
import {PopupService} from '../popup.service';
import {LoginService} from '../login.service';
import {Bokemon} from '../bokemon';
import {BokemonService} from '../bokemon.service';
import {BokemonTemplateService} from '../bokemon-template.service';

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
              private router: Router, private popup: PopupService,
              private bokemonService: BokemonService, private templateService: BokemonTemplateService) { }
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
    const sprite = "https://i.imgur.com/iwnZWVy.png"
    const x = 3;
    const y = 0;
    // const bokemons = "";

    this.templateService.findAll().subscribe(bokemonTemplates => {
      let temp = bokemonTemplates[0]; // frank
      console.log(JSON.stringify(temp));
      let bokemon: Bokemon = new Bokemon(0, temp, 1);   // lvl ook random maken
      console.log(bokemon.lvl);
      this.bokemonService.createBokemon(bokemon).subscribe(br=>{
        console.log(bokemon);
        console.log(JSON.stringify(bokemon));
        this.signupService.saveUser(new Player( 0, username, password, world, sprite, x, y, br)).
        subscribe(player =>{
            console.log(bokemon.lvl)
            console.log("Signup complete");
            this.router.navigate(['world-view']);
          }
        );
      });


    });






    //
    // this.signupService.saveUser(new Player( 0, username, password, world, sprite, x, y, wildBokemon)).
    // subscribe(player =>{
    //   console.log("Signup complete");
    //   this.router.navigate(['world-view']);
    //   }
    //   );
    
    
  }

  goToLogin() {
    this.router.navigate(['login-page'])
  }
}
