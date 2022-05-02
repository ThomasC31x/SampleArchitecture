import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../shared/toast.service';
import { AuthService } from './auth.service';
import { CreateAccountPage } from './create-account/create-account.page';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string
  password: string

  constructor(private modal: ModalController,
              private toast: ToastService,
              private authService: AuthService) { }

  ngOnInit() { }

  async createAccount() {
    const modal = await this.modal.create({
      component: CreateAccountPage
    })

    await modal.present()
  }

  async forgotPassword() {
    const modal = await this.modal.create({
      component: ForgotPasswordComponent
    })

    await modal.present()
  }

  isReadyToConnect() {
    return !(this.email?.length && this.password?.length)
  }

  connect() {
    this.authService.login(this.email, this.password).subscribe(this.authService.connected, (e) => {
      this.toast.display(e.error.message)
    })
  }

}
