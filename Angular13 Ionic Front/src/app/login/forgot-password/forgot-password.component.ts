import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  email: string

  constructor(private modal: ModalController,
              private authService: AuthService,
              private toast: ToastService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}

  async noticeOk() {
    const alert = await this.alertController.create({
      header: 'Check your email',
      message: 'You will shortly receive an email to reset your password.'
    });

    await alert.present();
    this.dismissModal()
  }

  async resetPassword() {
    this.authService.forgotPassword(this.email).subscribe(
      () => this.noticeOk(),
      () => {
        this.toast.display("Please try again later.")
        this.router.navigateByUrl("")
      }
    )
  }

  isReady() {
    return !(this.email?.length)
  }

  dismissModal() {
    this.modal.dismiss()
  }

}
