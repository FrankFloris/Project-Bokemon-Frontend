import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../Player";

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {

  @Input()
  player: Player

  constructor() { }

  ngOnInit() {
  }

}
