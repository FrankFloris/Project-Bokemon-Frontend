import { Component, OnInit } from '@angular/core';
import { MAP} from '../mock-map';

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css']
})
export class WorldViewComponent implements OnInit {

  view: string[][]; // 2D array of URLs, representing the tiles in view.

  constructor() { }

  ngOnInit() {
    this.view = MAP;     // Set the view to be the mock data map
  }

}
