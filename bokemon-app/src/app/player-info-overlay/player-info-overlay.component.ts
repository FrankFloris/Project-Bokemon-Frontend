import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../Player";

@Component({
  selector: 'app-player-info-overlay',
  templateUrl: './player-info-overlay.component.html',
  styleUrls: ['./player-info-overlay.component.css']
})
export class PlayerInfoOverlayComponent implements OnInit {

  @Input()
  player: Player;

  @Output()
  close = new EventEmitter();

  constructor() { }

  onClose() {
    this.close.emit();
  }

  ngOnInit() {
  }

}
