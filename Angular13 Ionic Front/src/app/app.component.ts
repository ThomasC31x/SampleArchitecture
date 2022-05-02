import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.create();

    if(environment.production == true) {
      window.console.log = function () { };
      console.log = function () {};
    }
  }
}
