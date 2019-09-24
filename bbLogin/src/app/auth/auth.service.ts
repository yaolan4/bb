import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // handles post
// import { tap } from 'rxjs/operators'; // perform side effects when subscribing to the observables returned by the http client methods
import { Observable, BehaviorSubject } from 'rxjs'; // APIs working with asynch ops
// import { from } from 'rxjs';

import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AuthResponse } from './auth-response';
// import { AuthResponse } from './auth-response';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject(false); // false: the user is not authenticated at the beginning
  // user: User;
  AUTH_SERVER_ADDRESS = 'http://localhost:8000/api/v1';
  constructor(private storage: Storage, private httpClient: HttpClient) {
    // check if the platform is ready? and call check token
    // this.checkToken();
  }

  login(email: string, password: string) {
    // get token from backend, but for now leave it here?
      const endpoint = `${this.AUTH_SERVER_ADDRESS}/user/authentication/generic/login`;
      return this.httpClient
        .post<any>(endpoint, {
          email,
          password
        })
        .pipe(
          map( user => {
            console.log(user);
            this.setUserLocalStorage(user.token);
            this.authSubject.next(true);
            // return user;
          })
        );
  }
  setUserLocalStorage(token: string) {
     const decodedUser = JSON.parse(atob(token.split('.')[1]));
     const user = new AuthResponse (decodedUser.email, decodedUser.access_token, decodedUser.exp,
                                            decodedUser.is_superuser, decodedUser.user_type);


     this.storage.set(TOKEN_KEY, JSON.stringify(user)).then(result => {
       if (result) {
         console.log('token set', user.email, user.isSuperuser);
        //  this.getUserLocalStorage(TOKEN_KEY);
       } else {
         console.log('token not set');
       }
     });
  }

  getUserLocalStorage(tokenKey: string): any {
    // const user = JSON.parse();
    console.log('token key is ', tokenKey);
    this.storage.get(tokenKey).then(result => {
      if (result) {
        const user = JSON.parse(result);
        console.log('token get ', user);
        if (user) {
          console.log('return new user with user email ', user.email);
          return new AuthResponse (user.email, user.access_token, user.exp, user.isSuperuser, user.userType);
        } else {
          return null;
        }
      } else {
        console.log('token not get');
      }
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authSubject.next(false); // whoever sybscribes to the behavior subkect will be notified that
      // the user is not authenticated anymore
    });
  }

  isAuthenticated() {
    return this.authSubject.value; // return the current state of suthentication
  }

  checkToken() {
    // should modify this to check if the token is valid and within expire date
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authSubject.next(true);
      }
    });
  }
}
