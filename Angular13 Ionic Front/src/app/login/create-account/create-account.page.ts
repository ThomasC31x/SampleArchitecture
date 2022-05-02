import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/class';
import { ToastService } from 'src/app/shared/toast.service';
import { UserService } from 'src/app/shared/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  username: string
  password: string
  email: string

  constructor(private modal: ModalController,
              private toast: ToastService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  create() {
    const user = new User(this.username, this.password, this.email)
    this.authService.createUser(user).subscribe((user: User) => { 
      this.toast.display("Account successfull created!")
      this.dismissModal()
      this.authService.connected(user)
    })
  }

  isReadyToCreate() {
    return !(this.username?.length && this.password?.length && this.email?.length)
  }

  dismissModal() {
    this.modal.dismiss()
  }

}
