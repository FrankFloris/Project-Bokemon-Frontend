import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignupService} from '../signup.service';
import {Player} from '../Player';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  @Input()
  signup: SignupComponent;

  public signupPage = this.fb.group( {
    username:   ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder, private signupService: SignupService) { }


  ngOnInit() {
  }

  public saveNewUser(event) {

    const username = this.signupPage.controls['username'].value;
    const password = this.signupPage.controls['password'].value;

    this.signupService.saveUser(new Player( 0, username, password)).
    subscribe() //() => this.signupService.findAll().subscribe)
  }
}
