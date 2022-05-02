import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../class';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUser: string = "user/"

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) { }

  createUser(userData: User) {
    return this.http.post(`${environment.baseUrl}${this.apiUser}signup`, {...userData})
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.baseUrl}${this.apiUser}forgot-password`, {email})
  }

  login(email, password) {
    return this.http.post(`${environment.baseUrl}${this.apiUser}login`, {email, password})
  }

  connected(user: User) {
    console.log(user);
    this.userService.user = user;
    this.userService.setUserToken(user.token);
    this.router.navigateByUrl("/tabs/")
  }
}
