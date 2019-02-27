import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../Player";
import {Bokemon} from '../bokemon';

@Component({
  selector: 'app-player-info-overlay',
  templateUrl: './player-info-overlay.component.html',
  styleUrls: ['./player-info-overlay.component.css'],

  host: {
    '(document:keydown)': 'onKey($event)'
  }
})
export class PlayerInfoOverlayComponent implements OnInit {

  @Input()
  player: Player;

  @Output()
  close = new EventEmitter();

  bokemons: Bokemon[];
  currentBokemon: Bokemon;
  i: number = 0;

  constructor() { }

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
    this.bokemons = this.player.bokemons;
    this.currentBokemon = this.bokemons[this.i];
  }

  onKey(event: KeyboardEvent){
    switch (event.key){
      case "ArrowLeft":
        this.decreaseIndex();
        break;
      case "ArrowRight":
        this.increaseIndex();
        break;
    }
  }

  increaseIndex() {
    if (this.i < (this.bokemons.length-1)) {
      this.i++;
      this.currentBokemon = this.bokemons[this.i];
    }
  }

  decreaseIndex(){
    if (this.i > 0){
      this.i--;
      this.currentBokemon = this.bokemons[this.i];
    }
  }

}
