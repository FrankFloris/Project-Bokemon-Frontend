import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wildBokemon-app';
  constructor(injector: Injector) {
    // Convert `PopupComponent` to a custom element.
    //const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    //customElements.define('popup-element', PopupElement);
  }


}
