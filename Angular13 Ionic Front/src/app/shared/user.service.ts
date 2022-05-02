import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../class';

const TOKEN_KEY = "token"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User

  constructor(private storage: Storage) { }

  setUserToken(token: string) {
    this.storage.set(TOKEN_KEY, token);
    this.user.token = token;
  }

  getUserToken(): Promise<string> {    
    return this.storage.get(TOKEN_KEY).then(
      (value: string) => {        
        this.user.token = value;
        return value; 
      }
    )
  }

  deleteUserToken() {
    this.user.token = null
    this.storage.remove(TOKEN_KEY).then(() => {
      console.log("Le token utilisateur a été supprimé");
    });
  }
  
}
