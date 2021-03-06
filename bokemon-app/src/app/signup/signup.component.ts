import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Player} from '../Player';
import { Router} from '@angular/router';
import {Bokemon} from '../bokemon';
import {BokemonService} from '../bokemon.service';
import {BokemonTemplateService} from '../bokemon-template.service';
import {PlayerService} from "../player.service";
import {AuthenticationService} from "../authentication.service";
import {BokemonTemplate} from "../bokemonTemplate";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: []
})
export class SignupComponent implements OnInit {

  starterTemplates: BokemonTemplate[];
  selectedStarter: BokemonTemplate;

  public signupPage = this.fb.group( {
    username:   ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder,
              private playerService: PlayerService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private bokemonService: BokemonService,
              private templateService: BokemonTemplateService
  ) { }
  //, private router: Router    dit kan misschien in de constructor

  ngOnInit() {
    this.getBokemonTemplates();
  }

  public onSignup(event) {
    const username = this.signupPage.controls['username'].value;
    const password = this.signupPage.controls['password'].value;

    this.playerService.findByUsername(username)
      .subscribe(players => {
        console.log(players);
        if (players && players.length == 0) {
          this.addNewPlayerAndLogin(username, password);
        } else {
          window.alert("This username is not available, please choose a different username");
        }
      })
  }

  private addNewPlayerAndLogin(username: string, password: string) {

    this.bokemonService.createBokemon(new Bokemon(0, this.selectedStarter, 5))
      .subscribe(bokemon => {
        let player = new Player(
          0,
          username,
          password,
          8,
          "https://i.imgur.com/TCT6xch.png",
          8,
          73,
          [bokemon]);
        console.log(JSON.stringify(player));
        this.playerService.createPlayer(player)
          .subscribe(() => {
            console.log(player.username + " " + player.password);
            this.authenticationService.login(player.username, player.password)
              .subscribe(() => {
                this.router.navigate(['world-view']);
              })
          })
      })
  }

  onGoToLogin() {
    this.router.navigate(['login-page']);
  }

  onStarterSelect(selected: BokemonTemplate) {
    this.selectedStarter = selected;
  }

  private getBokemonTemplates() {
    this.templateService.findAll()
      .subscribe(templates => {
        this.starterTemplates = templates.slice(0, 3);
        this.selectedStarter = templates[0];
      })
  }

}
