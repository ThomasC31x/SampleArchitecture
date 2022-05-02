import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader = null;

  constructor(public loadingController: LoadingController) { }

  async present(message?: string, spinner?: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small", duration = 4000) {
    
    if(this.loader) return;

    this.loader = await this.loadingController
      .create({
        duration,
        message: message || "",
        translucent: true,
        spinner
      });

    await this.loader.present();
  }

  async dismiss() {
    if(this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
  }
}