import { Component, OnInit } from '@angular/core';
import {Bokemon} from '../bokemon';
import {BokemonTemplateService} from '../bokemon-template.service';
import {BokemonService} from '../bokemon.service';

@Component({
  selector: 'app-battle-view',
  templateUrl: './battle-view.component.html',
  styleUrls: ['./battle-view.component.css']
})
export class BattleViewComponent implements OnInit {

  constructor(private bokemonService: BokemonService, private templateService: BokemonTemplateService) { }

  ngOnInit() {
  }

  onNewBokemon(): void {
    this.templateService.findAll().subscribe(bokemonTemplates => {
      let temp = bokemonTemplates[0]; // frank
      console.log(JSON.stringify(temp));
      let bokemon: Bokemon = new Bokemon(0, temp, 1);   // lvl ook random maken
      console.log(bokemon.lvl);
      this.bokemonService.createBokemon(bokemon).subscribe(id=>{
        console.log(id);
        console.log(JSON.stringify(bokemon));
      });


    });
  }

}
