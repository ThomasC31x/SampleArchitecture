import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast;

  constructor(public toastController: ToastController) { }

  display(message, duration = 4000, waitPresent = false) {

    return new Promise(async (resolve, reject) => {
      try {
        await this.toast.dismiss();
      } catch(e) {}

      this.toast = await this.toastController.create({
        message: message,
        duration,
        translucent: true,
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });

      if(waitPresent == false) await this.toast.present();
      
      resolve(this.toast)
    })
  }
}
