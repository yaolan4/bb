import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  pswd: string;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    // noarmally would pass the info to the server
    // animcation
    // console.log(this.email);
    // console.log(this.pswd);
    this.authService.login(this.email, this.pswd)
      .subscribe(response => {
        this.router.navigate(['../user-dashboard']);
      }, error => {
        if (error.status === 504) {
          alert('network error');
        } else if (error.status === 400) {
          alert('Email or password does not exist');
        } else {
          console.log('some other type of err');
        }
      });
  }
}
